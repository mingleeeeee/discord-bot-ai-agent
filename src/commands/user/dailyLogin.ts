/* eslint-disable no-useless-escape */
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import parseMilliseconds from "parse-ms";
import { getLoginTask } from "../tools/loginTaskTools";
import { getTaskTypeByType } from "../tools/taskTypeTools";
import {
  createCompletedTask,
  getCompletedTask,
  updateCompletedTask,
} from "../tools/completedTaskUserTools";
import { updateMoney } from "../tools/updateMoney";
import { finalBonusAmount } from "../tools/bonusTools";
import { checkUserRoles } from "../tools/checkRole";
import { localeCommand, localeMessages } from "../language";
import { checkActiveSeason } from "../tools/blockCommandTools";

const data = new SlashCommandBuilder()
  .setName("daily-login")
  .setDescription("check in for daily login")
  .setDescriptionLocalizations(localeCommand.dailyLogin.comDes);

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTimestamp();

  try {
    if (!(await checkActiveSeason())) {
      await interaction.reply({
        content: translate.noActiveSeason,
        ephemeral: true,
      });
      return;
    }

    const getLoginTaskData = (await getLoginTask()) || [];

    if (!getLoginTaskData.length) {
      replyEmbed.addFields({
        name: translate.noDailyLoginTaskData,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // get the login task data
    const {
      id: loginTaskId,
      taskTypeId: loginTaskTypeId,
      channelId: allowedChannelId,
      duration,
      startAt,
      endAt,
    } = getLoginTaskData[0];

    // check user's role
    if (!(await checkUserRoles(interaction, Number(loginTaskTypeId)))) {
      replyEmbed.addFields({
        name: translate.notTaskTagetRole,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // check if the command is used in the allowed channel
    if (interaction.channelId !== allowedChannelId) {
      replyEmbed.addFields({
        name: translate.onlySpecificChannel,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const now = Date.now();

    // check the startAt and endAt
    if (now < Number(startAt) || now > Number(endAt)) {
      replyEmbed.addFields({
        name: translate.dailyLoginNotAvailable,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const getLoginTaskTypeData = (await getTaskTypeByType("login")) || [];
    if (!getLoginTaskTypeData.length) {
      replyEmbed.addFields({
        name: translate.noLoginTaskType,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const { reward } = getLoginTaskTypeData[0];
    const userId = interaction.user.id;

    const getCompletedTaskData =
      (await getCompletedTask(Number(loginTaskTypeId), loginTaskId, userId)) ||
      [];

    const bonus =
      (await finalBonusAmount(Number(loginTaskTypeId), loginTaskId)) || 0;

    // if there is no user's completed task data of login, create it
    if (!getCompletedTaskData.length) {
      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);

      await createCompletedTask(Number(loginTaskTypeId), loginTaskId, userId);

      replyEmbed.addFields({
        name: ` \:boom: ${translate.completeDailyLoginTask.replace("{reward}", Number(reward).toString()).replace("{bonus}", bonus > 0 ? ` Bonus: ${bonus}` : "")}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const { id: completedTaskId, completedAt } = getCompletedTaskData[0];

    // if the user has already completed the task, check the duration
    // check if the user has already logged in the duration
    if (
      getCompletedTaskData.length &&
      now - Number(completedAt) < Number(duration)
    ) {
      const nextLogin = parseMilliseconds(
        Number(duration) - (now - Number(completedAt))
      );
      replyEmbed.addFields({
        name: ` \:boom: ${translate.alreadyLogin.replace("{hours}", nextLogin.hours.toString()).replace("{minutes}", nextLogin.minutes.toString()).replace("{seconds}", nextLogin.seconds.toString())}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    if (
      getCompletedTaskData.length &&
      now - Number(completedAt) > Number(duration)
    ) {
      await updateCompletedTask(completedTaskId, {
        completedAt: Date.now().toString(),
      });

      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);

      replyEmbed.addFields({
        name: ` \:boom: ${translate.completeDailyLoginTask.replace("{reward}", Number(reward).toString()).replace("{bonus}", bonus > 0 ? ` Bonus: ${bonus}` : "")}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: translate.somethingWrong,
      ephemeral: true,
    });
    return;
  }
};

export const dailyLoginCommand = {
  data,
  execute,
};
