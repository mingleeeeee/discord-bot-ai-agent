import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { CurrencyDBDataSource } from "@/sasat/dataSources/db/Currency";
import { emojiToUnicode, isEmoji } from "@/commands/tools/checkEmoji";

const data = new SlashCommandBuilder()
  .setName("set-currency")
  .setDescription("set the currency symbol")
  .addStringOption((option) =>
    option.setName("symbol").setDescription("The symbol").setRequired(true)
  );

const execute: Command = async (interaction) => {
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();
  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`You are not admin.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const targetSymbol = interaction.options.getString("symbol") || "";

    // if the symbol is emoji, convert it to unicode
    const targetSymbolConvert = isEmoji(targetSymbol)
      ? emojiToUnicode(targetSymbol)
      : targetSymbol;

    const getCurrency = await new CurrencyDBDataSource().find({
      fields: ["id", "symbol"],
    });

    // if there is no currency in the db, create it
    if (!getCurrency.length) {
      await new CurrencyDBDataSource().create({
        symbol: targetSymbolConvert,
      });

      replyEmbed.setTitle(`Set the currency symbol to ${targetSymbol}. `);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if there is currency in the db, update it
    await new CurrencyDBDataSource().update({
      id: getCurrency[0].id,
      symbol: targetSymbolConvert,
    });

    replyEmbed.setTitle(`Set the currency symbol to ${targetSymbol}. `);
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

export const setCurrencyCommand = {
  data,
  execute,
};
