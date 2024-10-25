/* eslint-disable no-useless-escape */
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import parseMilliseconds from "parse-ms";
import { getTaskTypeByType } from "../../tools/taskTypeTools";
import {
  createCompletedTask,
  getCompletedTask,
  updateCompletedTask,
} from "../../tools/completedTaskUserTools";
import { updateMoney } from "../../tools/updateMoney";
import { getPostTask } from "../../tools/discordPostTaskTools";
import { finalBonusAmount } from "../../tools/bonusTools";
import { checkUserRoles } from "../../tools/checkRole";

const data = new SlashCommandBuilder()
  .setName("daily-stamp-verify")
  .setDescription("check in for daily stamp verify")
  .addStringOption((option) =>
    option.setName("stamp").setDescription("string stamp").setRequired(true)
  );

const execute: Command = async (interaction) => {
  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTimestamp();

  try {
    // hardcoded channel id
    if (interaction.channelId !== "1203005961363787847") {
      await interaction.reply({
        content: "This command can only be used in daily-login channel.",
        ephemeral: true,
      });
      return;
    }

    const channelId = interaction.channelId;
    const inputStamp = interaction.options.getString("stamp") || "";
    const getPostTaskData = (await getPostTask(inputStamp, channelId)) || [];

    if (!getPostTaskData.length) {
      replyEmbed.setTitle(
        `There is no daily stamp task with string ${inputStamp} in this channel.`
      );
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // get the stamp task data
    const {
      id: stampTaskId,
      taskTypeId: stampTaskTypeId,
      channelId: allowedChannelId,
    } = getPostTaskData[0];

    // check user's role
    if (!(await checkUserRoles(interaction, Number(stampTaskId)))) {
      replyEmbed.setTitle(`You are not the task target role.`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // check if the command is used in the allowed channel
    if (interaction.channelId !== allowedChannelId) {
      await interaction.reply({
        content: "This command can only be used in a specific channel.",
        ephemeral: true,
      });
      return;
    }

    const now = Date.now();

    const getPostTaskTypeData = (await getTaskTypeByType("discordPost")) || [];
    if (!getPostTaskTypeData.length) {
      await interaction.reply({
        content: "There is no discord post task type data.",
        ephemeral: true,
      });
      return;
    }

    const { reward } = getPostTaskTypeData[0];
    const userId = interaction.user.id;

    const getCompletedTaskData =
      (await getCompletedTask(Number(stampTaskTypeId), stampTaskId, userId)) ||
      [];

    const bonus =
      (await finalBonusAmount(Number(stampTaskTypeId), stampTaskId)) || 0;

    // if there is no user's completed task data of discordPost, create it
    if (!getCompletedTaskData.length) {
      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);

      await createCompletedTask(Number(stampTaskTypeId), stampTaskId, userId);

      replyEmbed.setTitle(
        `Completed daily stamp task. Add ${reward} to your balance. Bonus: ${bonus}`
      );
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const { id: completedTaskId, completedAt } = getCompletedTaskData[0];
    const oneDay = 1000 * 60 * 60 * 24;
    // if the user has already completed the task, check the duration
    // check if the user has already logged in the duration
    if (getCompletedTaskData.length && now - Number(completedAt) < oneDay) {
      const nextLogin = parseMilliseconds(oneDay - (now - Number(completedAt)));
      replyEmbed.setTitle(
        ` \:boom: \:boom: \:boom: You have already completed daily stamp task. \nNext stamp task time: ${nextLogin.hours}h ${nextLogin.minutes}m ${nextLogin.seconds}s.`
      );
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    if (getCompletedTaskData.length && now - Number(completedAt) > oneDay) {
      await updateCompletedTask(completedTaskId, {
        completedAt: Date.now().toString(),
      });

      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);

      replyEmbed.setTitle(
        ` \:boom: \:boom: \:boom: Completed daily stamp task. Add ${reward} to your balance. Bonus: ${bonus}`
      );
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
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

export const dailyStampVerifyCommand = {
  data,
  execute,
};
