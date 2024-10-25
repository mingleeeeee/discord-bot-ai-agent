import { SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { localeCommand } from "../language";

const data = new SlashCommandBuilder()
  .setName("start-season")
  .setDescription("start the season")
  .setDescriptionLocalizations(localeCommand.startSeason.comDes)
  .addStringOption((option) =>
    option
      .setName("date")
      .setDescription("set reservation time in YYYY-MM-DD hh:mm:ss JST format")
      .setDescriptionLocalizations(localeCommand.startSeason.dateDes)
      .setRequired(true)
  );

const execute: Command = async () => {
  try {
    // start-season logic is in the index.ts file
    return;
  } catch (error) {
    console.error(error);

    return;
  }
};

export const startSeasonCommand = {
  data,
  execute,
};
