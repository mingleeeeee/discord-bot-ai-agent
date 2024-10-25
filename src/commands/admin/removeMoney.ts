import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { updateMoney } from "@/commands/tools/updateMoney";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("remove-money-account")
  .setDescription("remove money to user")
  .setDescriptionLocalizations(localeCommand.removeMoney.comDes)
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The user to remove money to")
      .setDescriptionLocalizations(localeCommand.removeMoney.targetDes)
      // must input option
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("value")
      .setDescription("The value to remove from the user")
      .setDescriptionLocalizations(localeCommand.removeMoney.valueDes)
      .setRequired(true)
      .setMinValue(0)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("remove-money-confirm")
      .setLabel("confirm")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("remove-money-cancel")
      .setLabel("cancel")
      .setStyle(ButtonStyle.Danger)
  );

  const disabledRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("remove-money-confirm")
      .setLabel("confirm")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId("remove-money-cancel")
      .setLabel("cancel")
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true)
  );

  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const targetUser = interaction.options.getUser("target");
    const targetUserId = targetUser?.id || "";
    const removeValue = Number(interaction.options.getInteger("value"));

    /// change
    replyEmbed.setTitle(
      `${translate.removeMoneyWithExpire.replace("{removeValue}", removeValue.toString()).replace("{targetUser}", targetUser?.username || "")}`
    );

    const message = await interaction.reply({
      embeds: [replyEmbed],
      components: [row],
      fetchReply: true,
    });

    // Create a collector to listen for button clicks
    const collector = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 1200000, // 20 minutes
    });

    collector.on("collect", async (i) => {
      if (i.customId === "remove-money-confirm") {
        // remove money to user
        await updateMoney(targetUserId, -removeValue);
        replyEmbed.setTitle(
          `${translate.removeMoney.replace("{removeValue}", removeValue.toString()).replace("{username}", targetUser?.username || "")}`
        );
        // Update the message with the new embed
        await i.update({ embeds: [replyEmbed], components: [disabledRow] });
        // stop the collector with the reason "done"
        collector.stop("done");
      }

      if (i.customId === "remove-money-cancel") {
        /// change
        replyEmbed.setTitle(
          `${translate.removeMoneyCancel.replace("{targetUser}", targetUser?.username || "")}`
        );
        await i.update({ embeds: [replyEmbed], components: [disabledRow] });
        // stop the collector with the reason "cancel"
        collector.stop("cancel");
      }
    });

    collector.on("end", async (collected, reason) => {
      try {
        if (reason === "time") {
          replyEmbed.setTitle(`${translate.timeout}`);

          // Update the message with the disabled buttons
          await message.edit({
            embeds: [replyEmbed],
            components: [disabledRow],
          });
        } else {
          // show other reasons
          console.log("collector end reason:", reason);
        }
      } catch (error) {
        // error handling
        console.error(error);
      }

      console.log("collector end");
      return;
    });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: translate.somethingWrong,
      ephemeral: true,
    });
    return;
  }
};

export const removeMoneyCommand = {
  data,
  execute,
};
