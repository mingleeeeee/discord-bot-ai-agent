import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { MiniGameDBDataSource } from "@/sasat/dataSources/db/MiniGame";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("set-slot-winrate")
  .setDescription("set winrate to slot")
  .setDescriptionLocalizations(localeCommand.setSlot.comDes)
  .addIntegerOption((option) =>
    option
      .setName("winrate")
      .setDescription("win rate percentage")
      .setDescriptionLocalizations(localeCommand.setSlot.winrateDes)
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(100)
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

    // check the startat and endat format
    const getWinRate = interaction.options.getInteger("winrate") || 0;

    if (getWinRate === 0) {
      replyEmbed.setTitle(`${translate.set1to100}`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const miniGameDB = new MiniGameDBDataSource();

    await miniGameDB.update({
      id: 2,
      winRate: getWinRate,
    });

    replyEmbed.setTitle(
      `${translate.slotWinrateSet.replace("{getWinRate}", getWinRate.toString())}`
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

export const setSlotCommand = {
  data,
  execute,
};
