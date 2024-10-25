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
import { checkRole } from "../tools/checkRole";
import { getCrimeTask } from "../tools/crimeTaskTools";
import { finalBonusAmount } from "../tools/bonusTools";
import { localeCommand, localeMessages } from "../language";
import { checkActiveSeason } from "../tools/blockCommandTools";

const data = new SlashCommandBuilder()
  .setName("crime")
  .setDescription("steal money from central bank")
  .setDescriptionLocalizations(localeCommand.crime.comDes);

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

    const winOrLose = (probability: number) => {
      // Generate a random number between 1 and 100
      const random = Math.floor(Math.random() * 100) + 1;

      return probability >= random ? "win" : "lose";
    };

    if (
      !checkRole(interaction, process.env.DISCORD_ROLE_NAME_LABOR || "Labor")
    ) {
      replyEmbed.addFields({
        name: `${translate.notLabor}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const getCrimeTaskData = (await getCrimeTask()) || [];

    // if there is no crime task
    if (!getCrimeTaskData.length) {
      replyEmbed.addFields({
        name: `${translate.noCrimeTask}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // get the crime task data
    const {
      id: crimeTaskId, //basically is 1
      taskTypeId: crimeTaskTypeId,
      duration,
      penalty,
      winRate,
    } = getCrimeTaskData[0];

    // check duration
    const now = Date.now();

    const getCrimeTaskTypeData = (await getTaskTypeByType("crime")) || [];
    if (!getCrimeTaskTypeData.length) {
      replyEmbed.addFields({
        name: `${translate.noCrimeTaskTypeData}`,
        value: "\n",
      });
      await interaction.reply({
        embeds: [replyEmbed],
        ephemeral: true,
      });
      return;
    }

    const { reward } = getCrimeTaskTypeData[0];
    const userId = interaction.user.id;

    const getCompletedTaskData =
      (await getCompletedTask(Number(crimeTaskTypeId), crimeTaskId, userId)) ||
      [];

    const bonus =
      (await finalBonusAmount(Number(crimeTaskTypeId), crimeTaskId)) || 0;

    // if there is no user's completed task data of crime, create it
    if (!getCompletedTaskData.length) {
      // crime functions
      // if lose
      if (winOrLose(Number(winRate)) === "lose") {
        await updateMoney(userId, -Number(penalty));
        await createCompletedTask(Number(crimeTaskTypeId), crimeTaskId, userId);

        replyEmbed.addFields({
          name: `${translate.crimeFailed.replace("{penalty}", Number(penalty).toString())}`,
          value: "\n",
        });
        await interaction.reply({ embeds: [replyEmbed] });
        return;
      }

      // if win
      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);

      await createCompletedTask(Number(crimeTaskTypeId), crimeTaskId, userId);

      replyEmbed.addFields({
        name: `${translate.crimeSuccess.replace("{reward}", Number(reward).toString()).replace("{bonus}", bonus > 0 ? ` Bonus: ${bonus}` : "")}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const { id: completedTaskId, completedAt } = getCompletedTaskData[0];

    // if the user has already completed the task, check the duration
    // check if the user has already crime in the duration
    if (
      getCompletedTaskData.length &&
      now - Number(completedAt) < Number(duration)
    ) {
      const nextCrime = parseMilliseconds(
        Number(duration) - (now - Number(completedAt))
      );
      replyEmbed.addFields({
        name: ` \:boom: ${translate.alreadyCrime.replace("{hours}", nextCrime.hours.toString()).replace("{minutes}", nextCrime.minutes.toString()).replace("{seconds}", nextCrime.seconds.toString())}`,
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
          name: `${translate.crimeFailed.replace("{penalty}", Number(penalty).toString())}`,
          value: "\n",
        });
        await interaction.reply({ embeds: [replyEmbed] });
        return;
      }

      // if win
      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);

      await updateCompletedTask(completedTaskId, {
        completedAt: Date.now().toString(),
      });

      replyEmbed.addFields({
        name: `${translate.crimeSuccess.replace("{reward}", Number(reward).toString()).replace("{bonus}", bonus > 0 ? ` Bonus: ${bonus}` : "")}`,
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

export const crimeCommand = {
  data,
  execute,
};
