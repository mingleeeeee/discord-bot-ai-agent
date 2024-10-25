import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { checkTaskType, createTaskType } from "../../tools/taskTypeTools";

const data = new SlashCommandBuilder()
  .setName("create-task-type")
  .setDescription("create a task type")
  .addStringOption((option) =>
    option.setName("tasktype").setDescription("The task type").setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("repetitive")
      .setDescription("Whether a repetitive task (1 is yes, 0 is no))")
      .setRequired(true)
      .setMinValue(0)
      .setMaxValue(1)
  )
  .addIntegerOption((option) =>
    option
      .setName("reward")
      .setDescription("The task reward")
      .setRequired(true)
      .setMinValue(0)
  );

const execute: Command = async (interaction) => {
  //basic embed
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  try {
    // hardcoded channel id
    if (interaction.channelId !== "1203006195775045663") {
      await interaction.reply({
        content: "This command can only be used in admin-tasks channel.",
        ephemeral: true,
      });
      return;
    }

    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`You are not admin.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const getTaskType = interaction.options.getString("tasktype") || "";
    const getRepetitive = Number(interaction.options.getInteger("repetitive"));
    const getReward = Number(interaction.options.getInteger("reward"));

    // if the task type is in the task type table, return
    if (await checkTaskType(getTaskType)) {
      replyEmbed.setTitle(
        `The task type ${getTaskType} is already in the task type table.`
      );
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if the task type is not in the task type table, create it
    await createTaskType(getTaskType, getRepetitive, getReward);

    replyEmbed.setTitle(`The task type ${getTaskType} is created.`);

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

export const createTaskTypeCommand = {
  data,
  execute,
};
