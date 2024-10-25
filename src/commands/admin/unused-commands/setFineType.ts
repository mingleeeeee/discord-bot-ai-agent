import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { FineTypeDBDataSource } from "@/sasat/dataSources/db/FineType";

const options = [
  { name: "percentage", value: "percentage" },
  { name: "amount", value: "amount" },
];

const data = new SlashCommandBuilder()
  .setName("set-fine-type")
  .setDescription("set the fine type")
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("The type of fine")
      .setRequired(true)
      .addChoices(...options)
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

    const targetType = interaction.options.getString("type") || "";
    const unselectedTypes = options.filter(
      (option) => option.name !== targetType
    );
    const getFineType = await new FineTypeDBDataSource().find({
      fields: ["id", "type", "status"],
    });

    // if there is no fine type in the db, create them
    if (!getFineType.length) {
      await new FineTypeDBDataSource().create({
        type: targetType,
        status: "active",
      });

      for (const unselectedType of unselectedTypes) {
        await new FineTypeDBDataSource().create({
          type: unselectedType.value,
          status: "inactive",
        });
      }

      replyEmbed.setTitle(`Set the fine type to ${targetType}. `);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if there is fine type in the db, update them
    await new FineTypeDBDataSource().update({
      id: getFineType.filter((t) => t.type == targetType)[0].id,
      type: targetType,
      status: "active",
    });

    // the remaining types are inactive
    for (const unselectedType of unselectedTypes) {
      await new FineTypeDBDataSource().update({
        id: getFineType.filter((t) => t.type == unselectedType.value)[0].id,
        type: unselectedType.value,
        status: "inactive",
      });
    }

    replyEmbed.setTitle(`Set the fine type to ${targetType}. `);
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

export const setFineTypeCommand = {
  data,
  execute,
};
