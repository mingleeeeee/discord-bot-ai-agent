import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { getItemByName, updateItem } from "../tools/itemTools";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("delete-item")
  .setDescription("change the item status to deleted")
  .setDescriptionLocalizations(localeCommand.deleteItem.comDes)
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("item name")
      .setDescriptionLocalizations(localeCommand.deleteItem.nameDes)
      .setRequired(true)
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

    const res = (await getItemByName(getItemName)) || [];

    // if the item is not in the item table
    if (!res.length) {
      replyEmbed.setTitle(
        `${translate.itemNotInTable.replace("{getItemName}", getItemName)}`
      );

      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if the item status is "deleted"
    if (res[0].status === "deleted") {
      replyEmbed.setTitle(
        `${translate.itemIsDeleted.replace("{getItemName}", getItemName)}`
      );

      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // if not, change the item status to "deleted"
    await updateItem(res[0].id, { status: "deleted" });

    replyEmbed.setTitle(
      `${translate.itemStatusChanged.replace("{getItemName}", getItemName)}`
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

export const deleteItemCommand = {
  data,
  execute,
};
