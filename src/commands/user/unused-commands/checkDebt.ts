import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { CurrencyDBDataSource } from "@/sasat/dataSources/db/Currency";
import { unicodeToEmoji } from "@/commands/tools/checkEmoji";
import { DebtDBDataSource } from "@/sasat/dataSources/db/Debt";
const data = new SlashCommandBuilder()
  .setName("check-debt")
  .setDescription("check your debt");

const execute: Command = async (interaction) => {
  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTimestamp();

  try {
    // hardcoded channel id
    if (interaction.channelId !== "1203005474753089587") {
      await interaction.reply({
        content: "This command can only be used in check-status channel.",
        ephemeral: true,
      });
      return;
    }

    const userId = interaction.user.id;
    const getBalanceById = await new DebtDBDataSource().findById(userId);
    const getCurrencySymbol = await new CurrencyDBDataSource().findById(1);
    const currencySymbol = getCurrencySymbol?.symbol || "";
    const currencySymbolConvert = unicodeToEmoji(currencySymbol);

    // if there is no user's balance
    if (!getBalanceById) {
      replyEmbed.setTitle(`You don't have debt`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    replyEmbed.setTitle(
      `Debt: ${currencySymbolConvert} ${getBalanceById.balance}`
    );
    await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

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

export const checkDebtCommand = {
  data,
  execute,
};
