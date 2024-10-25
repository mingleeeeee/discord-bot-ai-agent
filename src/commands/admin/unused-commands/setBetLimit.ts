import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { QExpr } from "sasat";
import { GameDBDataSource } from "@/sasat/dataSources/db/Game";
import { BetLimitDBDataSource } from "@/sasat/dataSources/db/BetLimit";

const options = [
  { name: "max", value: "max" },
  { name: "min", value: "min" },
];

const data = new SlashCommandBuilder()
  .setName("set-bet-limit")
  .setDescription("set the bet limit")
  .addStringOption((option) =>
    option.setName("game").setDescription("The game name").setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("extremum")
      .setDescription("The bet limit extremum")
      .setRequired(true)
      .addChoices(...options)
  )
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("The amount of bet limit")
      .setRequired(true)
      .setMinValue(0)
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

    const targetGame = interaction.options.getString("game") || "";
    const targetExtremum = interaction.options.getString("extremum") || "";
    const targetAmount = Number(interaction.options.getInteger("amount"));

    // if the target game is not in the game table, create it
    const gameDb = new GameDBDataSource();
    const betLimitDb = new BetLimitDBDataSource();

    const getGameByName = await gameDb.find(
      {
        fields: ["id", "name"],
      },
      {
        where: QExpr.conditions.eq(
          QExpr.field("t0", "name"),
          QExpr.value(targetGame)
        ),
      }
    );

    // if the target game is not in the game table, create it in both game table and bet limit table
    if (!getGameByName.length) {
      await gameDb
        .create({
          name: targetGame,
        })
        .then(async (res) => {
          await betLimitDb.create({
            gameId: res.id,
            extremum: targetExtremum,
            amount: targetAmount,
          });
        });

      replyEmbed.setTitle(
        `Set the bet limit of ${targetGame} to ${targetExtremum} ${targetAmount}. `
      );
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const getBetLimitByGameIdAndExtremum = await betLimitDb.find(
      {
        fields: ["id", "gameId", "extremum", "amount"],
      },
      {
        where: QExpr.conditions.and(
          QExpr.conditions.eq(
            QExpr.field("t0", "gameId"),
            QExpr.value(getGameByName[0].id)
          ),
          QExpr.conditions.eq(
            QExpr.field("t0", "extremum"),
            QExpr.value(targetExtremum)
          )
        ),
      }
    );

    // if the target game is not in the bet limit table, create it
    if (!getBetLimitByGameIdAndExtremum.length) {
      await betLimitDb.create({
        gameId: getGameByName[0].id,
        extremum: targetExtremum,
        amount: targetAmount,
      });
      replyEmbed.setTitle(
        `Set the bet limit of ${targetGame} to ${targetExtremum} ${targetAmount}. `
      );
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if the target game is in the bet limit table and game table, update it
    await betLimitDb.update({
      id: getBetLimitByGameIdAndExtremum[0].id,
      amount: targetAmount,
    });
    replyEmbed.setTitle(
      `Set the bet limit of ${targetGame} to ${targetExtremum} ${targetAmount}. `
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

export const setBetLimitCommand = {
  data,
  execute,
};
