import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { QExpr } from "sasat";
import { TaskTypeDBDataSource } from "@/sasat/dataSources/db/TaskType";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("edit-task-type")
  .setDescription("edit a task type")
  .setDescriptionLocalizations(localeCommand.editTaskType.comDes)
  .addStringOption((option) =>
    option
      .setName("tasktype")
      .setDescription("The task type to edit")
      .setDescriptionLocalizations(localeCommand.editTaskType.taskTypeDes)
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("repetitive")
      .setDescription("Whether a repetitive task (1 is yes, 0 is no)")
      .setDescriptionLocalizations(localeCommand.editTaskType.repetitiveDes)
      .setRequired(true)
      .setMinValue(0)
      .setMaxValue(1)
  )
  .addIntegerOption((option) =>
    option
      .setName("reward")
      .setDescription("The task reward")
      .setDescriptionLocalizations(localeCommand.editTaskType.rewardDes)
      .setRequired(true)
      .setMinValue(0)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  try {
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const getTaskType = interaction.options.getString("tasktype") || "";
    const getRepetitive = Number(interaction.options.getInteger("repetitive"));
    const getReward = Number(interaction.options.getInteger("reward"));

    const taskTypeDb = new TaskTypeDBDataSource();
    const getTaskTypeByType = await taskTypeDb.find(
      {
        fields: ["id", "type"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "type"),
          QExpr.value(getTaskType)
        ),
      }
    );

    // if the task type is not in the task type table, return
    if (!getTaskTypeByType.length) {
      replyEmbed.setTitle(
        `${translate.taskTypeNotInTaskTypeTable.replace("{getTaskType}", getTaskType)}`
      );

      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if the task type is not in the task type table, create it
    await taskTypeDb.update({
      id: getTaskTypeByType[0].id,
      repetitive: getRepetitive,
      reward: getReward,
    });

    replyEmbed.setTitle(
      `${translate.editTaskType.replace("{getTaskType}", getTaskType).replace("{getRepetitive}", getRepetitive.toString()).replace("{getReward}", getReward.toString())}`
    );

    await interaction.reply({ embeds: [replyEmbed] });
    return;
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: translate.somethingWrong,
      ephemeral: true,
    });
    return;
  }
};

export const editTaskTypeCommand = {
  data,
  execute,
};
