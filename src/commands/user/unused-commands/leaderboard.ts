import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { QExpr } from "sasat";
import { BalanceDBDataSource } from "@/sasat/dataSources/db/Balance";

const data = new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("get top 10 leaderboard");

const execute: Command = async (interaction) => {
  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Leaderboard")
    .setTimestamp();

  try {
    const getUsersBalance = await new BalanceDBDataSource().find(
      {
        fields: ["id", "balance"],
      },
      {
        sort: [QExpr.sort(QExpr.field("t0", "balance"), "DESC")],
        limit: 10,
      }
    );
    // console.log("getUsersBalance:", getUsersBalance);

    //if there is no user
    if (!getUsersBalance.length) {
      replyEmbed.setTitle(`There is no user.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // list users in the leaderboard
    for (const user of getUsersBalance) {
      const fetchUser = await interaction.guild?.members.fetch(user.id);
      replyEmbed.addFields({
        name: `\n`,
        value: `User: ${fetchUser?.user.username}, Balance:${user.balance}`,
        inline: false,
      });
    }

    await interaction.reply({ embeds: [replyEmbed] });
    return;
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Something went wrong.",
      ephemeral: true,
    });
    return;
  }
};

export const leaderboardCommand = {
  data,
  execute,
};
