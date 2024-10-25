import { SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";

const data = new SlashCommandBuilder()
  .setName("create-role")
  .setDescription("create a role")
  .addStringOption((option) =>
    option
      .setName("role")
      .setDescription("The role to create.")
      .setRequired(true),
  );

const execute: Command = async (interaction) => {
  // cerate role for testing
  try {
    const inputString = interaction.options.getString("role") || "";

    const guild = interaction.guild;
    guild?.roles.create({
      name: inputString.toString(),
      permissions: "0",
    });
    await interaction.reply(`Role \`${inputString}\` created!`);
  } catch (error) {
    console.error(error);
    return;
  }

  return undefined;
};

export const createRole = {
  data,
  execute,
};
