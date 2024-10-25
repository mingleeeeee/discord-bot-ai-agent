import { SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";

const data = new SlashCommandBuilder()
  .setName("delete-role")
  .setDescription("delete a role")
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("The role to delete.")
      .setRequired(true),
  );

const execute: Command = async (interaction) => {
  // delete role for testing

  try {
    const inputRole = interaction.options.getRole("role");
    const roleId = inputRole?.id;

    await interaction.guild?.members.fetch();
    const role = interaction.guild?.roles.cache.get(roleId || "");
    role?.delete();
    await interaction.reply(`Role \`${inputRole?.name}\` delete!`);
  } catch (error) {
    console.error(error);
    return;
  }

  return undefined;
};

export const deleteRole = {
  data,
  execute,
};
