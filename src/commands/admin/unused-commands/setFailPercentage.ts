import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { FailPercentageDBDataSource } from "@/sasat/dataSources/db/FailPercentage";
import { QExpr } from "sasat";

const options = [
  { name: "rob", value: "rob" },
  { name: "crime", value: "crime" },
];

const data = new SlashCommandBuilder()
  .setName("set-fail-percentage")
  .setDescription("set the fail-percentage of a crime")
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("The type of crime")
      .setRequired(true)
      .addChoices(...options)
  )
  .addIntegerOption((option) =>
    option
      .setName("percentage")
      .setDescription("The percentage of fail")
      .setRequired(true)
      .setMinValue(0)
      .setMaxValue(100)
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

    const targetCrimeType = interaction.options.getString("type") || "";
    const targetPercentage = Number(
      interaction.options.getInteger("percentage")
    );

    const getFailPercentageCrimeType =
      await new FailPercentageDBDataSource().find(
        {
          fields: ["id", "crimeType", "percentage"],
        },
        {
          where: QExpr.conditions.eq(
            QExpr.field("t0", "crimeType"),
            QExpr.value(targetCrimeType)
          ),
        }
      );

    // if there is no target crime type in the db, create it
    if (!getFailPercentageCrimeType.length) {
      await new FailPercentageDBDataSource().create({
        crimeType: targetCrimeType,
        percentage: targetPercentage,
      });

      replyEmbed.setTitle(
        `Set the fail percentage of ${targetCrimeType} to ${targetPercentage}%. `
      );
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if there is target crime type in the db, update it
    await new FailPercentageDBDataSource().update({
      id: getFailPercentageCrimeType[0].id,
      crimeType: targetCrimeType,
      percentage: targetPercentage,
    });

    replyEmbed.setTitle(
      `Set the fail percentage of ${targetCrimeType} to ${targetPercentage}%. `
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

export const setFailPercentageCommand = {
  data,
  execute,
};
