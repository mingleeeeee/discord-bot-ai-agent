import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { BalanceDBDataSource } from "@/sasat/dataSources/db/Balance";

const data = new SlashCommandBuilder()
  .setName("reset-money")
  .setDescription("reset the money to all users");

const execute: Command = async (interaction) => {
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`You are not admin.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const getUsersBalance = await new BalanceDBDataSource().find({
      fields: ["id", "balance"],
    });

    if (!getUsersBalance.length) {
      replyEmbed.setTitle(`There is no user.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    for (const user of getUsersBalance) {
      await new BalanceDBDataSource().update({
        id: user.id,
        balance: 0,
      });
    }

    replyEmbed.setTitle(`set all users' money to 0. `);
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

export const resetMoneyCommand = {
  data,
  execute,
};
