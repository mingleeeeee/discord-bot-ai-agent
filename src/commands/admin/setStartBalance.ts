import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { getLatestSeason, updateNextStartBalance } from "../tools/seasonTools";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("set-start-balance")
  .setDescription("set the start balance for next season")
  .setDescriptionLocalizations(localeCommand.setStartBalance.comDes)
  .addIntegerOption((option) =>
    option
      .setName("startbalance")
      .setDescription("start balance for next season")
      .setDescriptionLocalizations(
        localeCommand.setStartBalance.startBalanceDes
      )
      .setRequired(true)
      .setMinValue(0)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();
  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const getCurrentSeasonRes = (await getLatestSeason()) || [];

    if (!getCurrentSeasonRes.length) {
      replyEmbed.setTitle(`${translate.noSeason}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const nextStartBalance =
      interaction.options.getInteger("startbalance") || 0;
    await updateNextStartBalance(nextStartBalance);

    replyEmbed.setTitle(
      `${translate.setStartBalance.replace("{nextStartBalance}", nextStartBalance.toString())}`
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

export const setStartBalanceCommand = {
  data,
  execute,
};
