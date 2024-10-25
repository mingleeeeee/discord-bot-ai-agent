import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "@/commands/commands";
import { ItemDBDataSource } from "@/sasat/dataSources/db/Item";
import { getUserAllBalance } from "../tools/itemBalanceTools";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("check-item")
  .setDescription("check your item info")
  .setDescriptionLocalizations(localeCommand.itemInfo.comDes);

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTitle("Item Info")
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

  const userId = interaction.user.id;
  try {
    const getUserItemBalanceData = (await getUserAllBalance(userId)) || [];

    if (!getUserItemBalanceData?.length) {
      replyEmbed.addFields({
        name: translate.noItemInfo,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const genUserItemEmbed = async (pageIndex: number) => {
      const newEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL()?.toString(),
        })
        .setTitle("Item Info")
        .setTimestamp();

      for (let i = 0; i < 25; i++) {
        const item = getUserItemBalanceData[pageIndex * 25 + i];
        if (!item) break;

        const findItemByItemId = await new ItemDBDataSource().findById(
          Number(item.itemId),
          { fields: ["id", "name", "description", "price"] },
          { lock: "FOR UPDATE" }
        );

        let description = findItemByItemId?.description || "";
        if (description.length > 150) {
          description = description.substring(0, 150) + "...";
        }

        newEmbed.addFields({
          name: `${findItemByItemId?.name}`,
          value: `${translate.itemInfo
            .replace("{description}", findItemByItemId?.description || "")
            .replace("{balance}", Number(item.balance).toString())
            .replace("{price}", Number(findItemByItemId?.price).toString())}`,
          inline: false,
        });
      }

      return newEmbed;
    };

    // Send the embed with the buttons
    const message = await interaction.reply({
      embeds: [await genUserItemEmbed(0)],
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
        pageIndex = Math.min(
          pageIndex + 1,
          Math.ceil(getUserItemBalanceData.length / 25) - 1
        );
      }

      // Update the message with the new embed
      await i.update({ embeds: [await genUserItemEmbed(pageIndex)] });
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

export const itemInfoCommand = {
  data,
  execute,
};
