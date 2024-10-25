/* eslint-disable no-useless-escape */
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import parseMilliseconds from "parse-ms";
import { getTaskTypeByType } from "../tools/taskTypeTools";
import {
  createCompletedTask,
  getCompletedTask,
  updateCompletedTask,
} from "../tools/completedTaskUserTools";
import { updateMoney } from "../tools/updateMoney";
import { getRobTask } from "../tools/robTaskTools";

import { checkRole } from "../tools/checkRole";
import { finalBonusAmount } from "../tools/bonusTools";
import { localeCommand, localeMessages } from "../language";
import { checkActiveSeason } from "../tools/blockCommandTools";

const data = new SlashCommandBuilder()
  .setName("rob")
  .setDescription("rob other user's money")
  .setDescriptionLocalizations(localeCommand.rob.comDes);

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTitle(`Rob Result`)
    .setTimestamp();

  try {
    if (!(await checkActiveSeason())) {
      await interaction.reply({
        content: translate.noActiveSeason,
        ephemeral: true,
      });
      return;
    }

    const winOrLose = (probability: number) => {
      // Generate a random number between 1 and 100
      const random = Math.floor(Math.random() * 100) + 1;

      return probability >= random ? "win" : "lose";
    };

    const getRobTargetId = async () => {
      const guild = interaction.guild;
      await guild?.members.fetch();

      // get role name from DB
      const getRobTaskData = (await getRobTask()) || [];
      const stolenRoleName = getRobTaskData[0].stolenRole || "";

      // get role id by role name
      const roleId =
        guild?.roles.cache.find((r) => r.name === stolenRoleName)?.id || "";

      // get the users' ids from role's name
      const memberIds =
        guild?.roles.cache.get(roleId)?.members.map((m) => m.user.id) || [];

      // Generate a random index
      const rand = Math.random();
      const randomIndex = Math.floor(rand * Number(memberIds.length));
      // Select a random user as rob target from balance table
      const robTargetId = memberIds[randomIndex];

      return robTargetId;
    };

    if (
      !checkRole(interaction, process.env.DISCORD_ROLE_NAME_LABOR || "Labor")
    ) {
      replyEmbed.addFields({
        name: translate.notLabor,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const getRobTaskData = (await getRobTask()) || [];

    // if there is no rob task
    if (!getRobTaskData.length) {
      replyEmbed.addFields({
        name: translate.noRobTask,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // get the rob task data
    const {
      id: robTaskId, //basically is 1
      taskTypeId: robTaskTypeId,
      duration,
      penalty,
      winRate,
    } = getRobTaskData[0];

    const getRobTaskTypeData = (await getTaskTypeByType("rob")) || [];
    if (!getRobTaskTypeData.length) {
      replyEmbed.addFields({
        name: translate.noRobTaskData,
        value: "\n",
      });
      await interaction.reply({
        embeds: [replyEmbed],
        ephemeral: true,
      });
      return;
    }

    const { reward } = getRobTaskTypeData[0];
    const userId = interaction.user.id;

    const getCompletedTaskData =
      (await getCompletedTask(Number(robTaskTypeId), robTaskId, userId)) || [];

    const bonus =
      (await finalBonusAmount(Number(robTaskTypeId), robTaskId)) || 0;

    // if there is no user's completed task data of rob, create it
    if (!getCompletedTaskData.length) {
      // rob functions
      // if lose
      if (winOrLose(Number(winRate)) === "lose") {
        await updateMoney(userId, -Number(penalty));
        await createCompletedTask(Number(robTaskTypeId), robTaskId, userId);

        replyEmbed.addFields({
          name: translate.robFailed.replace(
            "{penalty}",
            Number(penalty).toString()
          ),
          value: "\n",
        });
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        return;
      }

      // if win
      const robTargetUserId = await getRobTargetId();
      const targetUser =
        await interaction.guild?.members.fetch(robTargetUserId);

      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);
      await updateMoney(robTargetUserId, -Number(reward));

      await createCompletedTask(Number(robTaskTypeId), robTaskId, userId);

      replyEmbed.addFields({
        name: translate.robSuccess
          .replace("{reward}", Number(reward).toString())
          .replace("{bonus}", bonus > 0 ? ` Bonus: ${bonus}` : ""),
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      await interaction.followUp({
        content: ` \:boom: <@${targetUser?.user.id}> ${translate.robbed}`,
      });
      return;
    }

    const { id: completedTaskId, completedAt } = getCompletedTaskData[0];

    const now = Date.now();
    // if the user has already completed the task, check the duration
    // check if the user has already rob in the duration
    if (
      getCompletedTaskData.length &&
      now - Number(completedAt) < Number(duration)
    ) {
      const nextRob = parseMilliseconds(
        Number(duration) - (now - Number(completedAt))
      );
      replyEmbed.addFields({
        name: translate.robAlreadyRobbed
          .replace("{hours}", nextRob.hours.toString())
          .replace("{minutes}", nextRob.minutes.toString())
          .replace("{seconds}", nextRob.seconds.toString()),
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    if (
      getCompletedTaskData.length &&
      now - Number(completedAt) > Number(duration)
    ) {
      // if lose
      if (winOrLose(Number(winRate)) === "lose") {
        await updateMoney(userId, -Number(penalty));
        await updateCompletedTask(completedTaskId, {
          completedAt: Date.now().toString(),
        });
        replyEmbed.addFields({
          name: translate.robFailed.replace(
            "{penalty}",
            Number(penalty).toString()
          ),
          value: "\n",
        });
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        return;
      }

      // if win
      const robTargetUserId = await getRobTargetId();
      const targetUser =
        await interaction.guild?.members.fetch(robTargetUserId);

      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);
      await updateMoney(robTargetUserId, -Number(reward));

      await updateCompletedTask(completedTaskId, {
        completedAt: Date.now().toString(),
      });

      replyEmbed.addFields({
        name: translate.robSuccess
          .replace("{reward}", Number(reward).toString())
          .replace("{bonus}", bonus > 0 ? ` Bonus: ${bonus}` : ""),
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      await interaction.followUp({
        content: ` \:boom: <@${targetUser?.user.id}> ${translate.robbed}`,
      });
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

export const robCommand = {
  data,
  execute,
};
