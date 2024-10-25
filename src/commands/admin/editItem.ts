import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { getItemByName, updateItem } from "../tools/itemTools";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("edit-item")
  .setDescription("edit item")
  .setDescriptionLocalizations(localeCommand.editItem.comDes)
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("item name")
      .setDescriptionLocalizations(localeCommand.editItem.nameDes)
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("description")
      .setDescription("item description")
      .setDescriptionLocalizations(localeCommand.editItem.descriptionDes)
  )
  // .addStringOption((option) =>
  //   option
  //     .setName("image")
  //     .setDescription("item image url")
  //     .setDescriptionLocalizations(localeCommand.editItem.imageDes)
  // )
  .addIntegerOption((option) =>
    option
      .setName("price")
      .setDescription("item price")
      .setDescriptionLocalizations(localeCommand.editItem.priceDes)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("balance")
      .setDescription("item balance")
      .setDescriptionLocalizations(localeCommand.editItem.balanceDes)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("maxium")
      .setDescription("item maxium per pesron")
      .setDescriptionLocalizations(localeCommand.editItem.maxiumDes)
      .setMinValue(0)
  )
  .addStringOption((option) =>
    option
      .setName("status")
      .setDescription("The item status")
      .setDescriptionLocalizations(localeCommand.editItem.statusDes)
      .addChoices(
        { name: "active", value: "active" },
        { name: "listed", value: "listed" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("reset")
      .setDescription("if user's item balance reset after a season")
      .setDescriptionLocalizations(localeCommand.editItem.resetDes)
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

    const optionNames = [
      "description",
      // "image",
      "price",
      "balance",
      "maxium",
      "status",
      "reset",
    ];

    const updateParams: { [key: string]: string | number } = {};

    // get the option value and add it to updateParams
    for (const optionName of optionNames) {
      const optionType = interaction.options.get(optionName)?.type;
      switch (optionType) {
        // 3 is string
        case 3: {
          const value = interaction.options.getString(optionName);
          if (value) {
            updateParams[optionName] = value;
          }
          // console.log("value:", value);
          break;
        }
        // 4 is integer
        case 4: {
          const value = Number(interaction.options.getInteger(optionName));
          if (value) {
            optionName === "maxium"
              ? (updateParams["maxiumPerPesron"] = value)
              : (updateParams[optionName] = value);
          }
          // console.log("value2:", value);
          break;
        }
        default:
          break;
      }
    }

    const res = (await getItemByName(getItemName)) || [];

    // if the item is not in the item table
    if (!res.length) {
      replyEmbed.setTitle(
        `${translate.itemNotInItemTable.replace("{getItemName}", getItemName)}`
      );
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    if (Object.keys(updateParams).length === 0) {
      replyEmbed.setTitle(`${translate.chooseUpdateParams}`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if so, update the item
    await updateItem(res[0].id, updateParams);

    replyEmbed.setTitle(
      `${translate.itemUpdated.replace("{getItemName}", getItemName)}`
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

export const editItemCommand = {
  data,
  execute,
};
