import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { getTaskTypeByType } from "../tools/taskTypeTools";
import {
  checkTaskTargetRole,
  removeTaskTargetRole,
} from "../tools/taskTargetRoleTools";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("remove-task-role")
  .setDescription("remove target role from task")
  .setDescriptionLocalizations(localeCommand.removeTaskRole.comDes)
  .addStringOption((option) =>
    option
      .setName("tasktype")
      .setDescription("task type name")
      .setDescriptionLocalizations(localeCommand.removeTaskRole.taskTypeDes)
      .setRequired(true)
  )
  .addRoleOption((option) =>
    option
      .setName("role1")
      .setDescription("target role")
      .setDescriptionLocalizations(localeCommand.removeTaskRole.roleDes)
      .setRequired(true)
  )
  .addRoleOption((option) =>
    option
      .setName("role2")
      .setDescription("target role")
      .setDescriptionLocalizations(localeCommand.removeTaskRole.roleDes)
      .setRequired(false)
  )
  .addRoleOption((option) =>
    option
      .setName("role3")
      .setDescription("target role")
      .setDescriptionLocalizations(localeCommand.removeTaskRole.roleDes)
      .setRequired(false)
  )
  .addRoleOption((option) =>
    option
      .setName("role4")
      .setDescription("target role")
      .setDescriptionLocalizations(localeCommand.removeTaskRole.roleDes)
      .setRequired(false)
  )
  .addRoleOption((option) =>
    option
      .setName("role5")
      .setDescription("target role")
      .setDescriptionLocalizations(localeCommand.removeTaskRole.roleDes)
      .setRequired(false)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  try {
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const getTaskType = interaction.options.getString("tasktype") || "";
    const roleNames = ["role1", "role2", "role3", "role4", "role5"];
    const validRoleNames = roleNames
      .map((role) => interaction.options.getRole(role)?.name || "")
      .filter((roleName) => roleName !== "");
    // console.log(validRoleNames);

    const taskTypeData = await getTaskTypeByType(getTaskType);
    // if the task type is not in the task type table, return
    if (!taskTypeData?.length) {
      replyEmbed.setTitle(
        `${translate.taskTypeNotInTaskTargetRoleTable.replace("{getTaskType}", getTaskType)}`
      );
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const taskTypeId = taskTypeData[0].id;

    for (const roleName of validRoleNames) {
      // if the task type with the role is not in the taskTargetRole table, return
      if (!(await checkTaskTargetRole(taskTypeId, roleName))) {
        replyEmbed.addFields({
          name: "\n",
          value: `${translate.noTaskTypeWithRole.replace("{getTaskType}", getTaskType).replace("{roleName}", roleName)}`,
        });
      } else {
        // if task type with the role is in the taskTargetRole table , return it
        await removeTaskTargetRole(taskTypeId, roleName);

        replyEmbed.addFields({
          name: "\n",
          value: `${translate.taskTypeWithRoleDeleted.replace("{getTaskType}", getTaskType).replace("{roleName}", roleName)}`,
        });
      }
    }
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

export const removeTaskRoleCommand = {
  data,
  execute,
};
