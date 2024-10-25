import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { FineAmountDBDataSource } from "@/sasat/dataSources/db/FineAmount";
import { QExpr } from "sasat";

const options = [
  { name: "max", value: "max" },
  { name: "min", value: "min" },
];

const data = new SlashCommandBuilder()
  .setName("set-fine-amount")
  .setDescription("set the fine amount")
  .addStringOption((option) =>
    option
      .setName("extremum")
      .setDescription("The extremum type of fine")
      .setRequired(true)
      .addChoices(...options)
  )
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("The amount of fine")
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

    const targetExtremum = interaction.options.getString("extremum") || "";
    const targetAmount = Number(interaction.options.getInteger("amount"));

    const getFineAnountByExtremum = await new FineAmountDBDataSource().find(
      {
        fields: ["id", "extremum", "amount"],
      },
      {
        where: QExpr.conditions.eq(
          QExpr.field("t0", "extremum"),
          QExpr.value(targetExtremum)
        ),
      }
    );

    // if there is no fine amount of max or min in the db, create it
    if (!getFineAnountByExtremum.length) {
      await new FineAmountDBDataSource().create({
        extremum: targetExtremum,
        amount: targetAmount,
      });

      replyEmbed.setTitle(
        `Set the fine amount to ${targetExtremum} ${targetAmount}. `
      );
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if there is fine type in the db, update them
    await new FineAmountDBDataSource().update({
      id: getFineAnountByExtremum[0].id,
      extremum: targetExtremum,
      amount: targetAmount,
    });

    replyEmbed.setTitle(
      `Set the fine amount to ${targetExtremum} ${targetAmount}. `
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

export const setFineAmountCommand = {
  data,
  execute,
};
