import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "@/commands/commands";
import { getListedItem } from "../tools/itemTools";
import { localeCommand, localeMessages } from "../language";
import { checkActiveSeason } from "../tools/blockCommandTools";

const data = new SlashCommandBuilder()
  .setName("check-store")
  .setDescription("items in the store")
  .setDescriptionLocalizations(localeCommand.itemStore.comDes);

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Store")
    .setDescription("Items in store")
    .setTimestamp();

  // Create a row of buttons
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("previous")
      .setLabel("<--")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("next")
      .setLabel("-->")
      .setStyle(ButtonStyle.Primary)
  );

  try {
    if (!(await checkActiveSeason())) {
      await interaction.reply({
        content: translate.noActiveSeason,
        ephemeral: true,
      });
      return;
    }

    const getItem = (await getListedItem()) || [];

    //if there is nothing in the store
    if (!getItem?.length) {
      replyEmbed.addFields({
        name: translate.noItemInStore,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const genStoreItemEmbed = (pageIndex: number) => {
      const newEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Store")
        .setDescription("Items in store")
        .setTimestamp();

      for (let i = 0; i < 25; i++) {
        const item = getItem[pageIndex * 25 + i];
        if (!item) break;

        let description = item.description || "";
        if (description.length > 150) {
          description = description.substring(0, 150) + "...";
        }

        newEmbed.addFields({
          name: `${item.name}`,
          value: translate.storeItem
            .replace("{price}", Number(item.price).toString())
            .replace("{balance}", Number(item.balance).toString())
            .replace(
              "{maxiumPerPesron}",
              Number(item.maxiumPerPesron).toString()
            )
            .replace("{description}", description),
          inline: false,
        });
      }

      return newEmbed;
    };

    // Send the embed with the buttons
    const message = await interaction.reply({
      embeds: [genStoreItemEmbed(0)],
      components: [row],
      ephemeral: true,
      fetchReply: true,
    });

    // Create a collector to listen for button clicks
    const collector = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 300000, // 5 minutes
    });

    let pageIndex = 0;
    collector.on("collect", async (i) => {
      if (i.customId === "previous") {
        pageIndex = Math.max(pageIndex - 1, 0);
      } else if (i.customId === "next") {
        pageIndex = Math.min(pageIndex + 1, Math.ceil(getItem.length / 25) - 1);
      }

      // Update the message with the new embed
      await i.update({ embeds: [genStoreItemEmbed(pageIndex)] });
    });

    // can not edit the ephemeral message, just delete it
    collector.on("end", async (collected, reason) => {
      try {
        if (reason === "time") {
          await interaction.deleteReply();
        }
      } catch (error) {
        console.error("Failed to delete message: ", error);
      }
    });

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

export const itemStoreCommand = {
  data,
  execute,
};
