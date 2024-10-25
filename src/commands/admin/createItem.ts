import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { checkItemByName, createItem } from "@/commands/tools/itemTools";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("create-item")
  .setDescription("create an item")
  .setDescriptionLocalizations(localeCommand.createItem.comDes)
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("item name")
      .setDescriptionLocalizations(localeCommand.createItem.nameDes)
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("description")
      .setDescription("item description")
      .setDescriptionLocalizations(localeCommand.createItem.desDes)
      .setRequired(true)
  )
  // .addStringOption((option) =>
  //   option
  //     .setName("image")
  //     .setDescription("item image url")
  //     .setDescriptionLocalizations(localeCommand.createItem.imageDes)
  //     .setRequired(true)
  // )
  .addIntegerOption((option) =>
    option
      .setName("price")
      .setDescription("item price")
      .setDescriptionLocalizations(localeCommand.createItem.priceDes)
      .setRequired(true)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("balance")
      .setDescription("item balance")
      .setDescriptionLocalizations(localeCommand.createItem.balanceDes)
      .setRequired(true)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("maxium")
      .setDescription("item maxium per pesron")
      .setDescriptionLocalizations(localeCommand.createItem.maxiumDes)
      .setRequired(true)
      .setMinValue(0)
  )
  .addStringOption((option) =>
    option
      .setName("status")
      .setDescription("item status")
      .setDescriptionLocalizations(localeCommand.createItem.statusDes)
      .setRequired(true)
      .addChoices(
        { name: "active", value: "active" },
        { name: "listed", value: "listed" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("reset")
      .setDescription("if user's item balance reset after a season")
      .setDescriptionLocalizations(localeCommand.createItem.resetDes)
      .setRequired(true)
      .addChoices(
        { name: "true", value: "true" },
        { name: "false", value: "false" }
      )
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

    const getItemName = interaction.options.getString("name") || "";
    const getItemDescription =
      interaction.options.getString("description") || "";
    // const getItemImage = interaction.options.getString("image") || "";
    const getItemPrice = Number(interaction.options.getInteger("price"));
    const getItemBalance = Number(interaction.options.getInteger("balance"));
    const getItemMaxiumPerPesron = Number(
      interaction.options.getInteger("maxium")
    );
    const getItemStatus = interaction.options.getString("status") || "";
    const getItemReset = interaction.options.getString("reset") || "";

    // Check if the name is less than 50 characters
    if (getItemName.length > 50) {
      replyEmbed.setTitle(`${translate.nameTooLong}`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // Check if the description is less than 100 characters
    if (getItemDescription.length > 150) {
      replyEmbed.setTitle(`${translate.descriptionTooLong}`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // check if the item is already in the table
    if (await checkItemByName(getItemName)) {
      replyEmbed.setTitle(
        `${translate.itemAlreadyInTable.replace("{getItemName}", getItemName)}`
      );

      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if not, create item
    await createItem(
      getItemName,
      getItemDescription,
      "", // no image
      getItemPrice,
      getItemBalance,
      getItemMaxiumPerPesron,
      getItemStatus,
      getItemReset
    );

    replyEmbed.setTitle(
      `${translate.itemCreated.replace("{getItemName}", getItemName)}`
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

export const createItemCommand = {
  data,
  execute,
};
