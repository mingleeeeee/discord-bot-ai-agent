import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { BalanceDBDataSource } from "@/sasat/dataSources/db/Balance";

const data = new SlashCommandBuilder()
  .setName("reset-money-user")
  .setDescription("reset the money to a user")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The user to reset money to")
      // must input option
      .setRequired(true)
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
    const targetUser = interaction.options.getUser("target");
    const targetUserId = targetUser?.id || "";

    const getUserBalanceById = await new BalanceDBDataSource().findById(
      targetUserId
    );

    if (!getUserBalanceById) {
      replyEmbed.setTitle(`There is no user's balance.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    await new BalanceDBDataSource().update({
      id: targetUserId,
      balance: 0,
    });

    replyEmbed.setTitle(`set ${targetUser?.username}'s balance to 0. `);
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

export const resetMoneyUserCommand = {
  data,
  execute,
};
