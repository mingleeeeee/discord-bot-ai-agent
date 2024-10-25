import { SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { localeCommand } from "../language";

const data = new SlashCommandBuilder()
  .setName("stop-season")
  .setDescription(
    "set the season end date (default is 14 days from start date)"
  )
  .setDescriptionLocalizations(localeCommand.stopSeason.comDes)
  .addStringOption((option) =>
    option
      .setName("date")
      .setDescription("set reservation time in YYYY-MM-DD hh:mm:ss JST format")
      .setDescriptionLocalizations(localeCommand.stopSeason.dateDes)
      .setRequired(true)
  );

const execute: Command = async () => {
  try {
    // stop-season logic is in the index.ts file
    return;
  } catch (error) {
    console.error(error);

    return;
  }
};

export const stopSeasonCommand = {
  data,
  execute,
};
