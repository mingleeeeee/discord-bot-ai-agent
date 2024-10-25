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
  .setName("add-money-account")
  .setDescription("add money to user")
  .setDescriptionLocalizations(localeCommand.addMoney.comDes)
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The user to add money to")
      .setDescriptionLocalizations(localeCommand.addMoney.targetDes)
      // must input option
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("value")
      .setDescription("The value to add to the user")
      .setDescriptionLocalizations(localeCommand.addMoney.valueDes)
      .setRequired(true)
      .setMinValue(0)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("add-money-confirm")
      .setLabel("confirm")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("add-money-cancel")
      .setLabel("cancel")
      .setStyle(ButtonStyle.Danger)
  );

  const disabledRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("add-money-confirm")
      .setLabel("confirm")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId("add-money-cancel")
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
    const addValue = Number(interaction.options.getInteger("value"));

    replyEmbed.setTitle(
      `${translate.addMoneyWithExpire.replace("{targetUser}", targetUser?.username || "").replace("{addValue}", addValue.toString())}`
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
      if (i.customId === "add-money-confirm") {
        // add money to user
        await updateMoney(targetUserId, addValue);
        replyEmbed.setTitle(
          `${translate.addMoneyToUser.replace("{addValue}", addValue.toString()).replace("{username}", targetUser?.username || "")}`
        );
        // Update the message with the new embed
        await i.update({ embeds: [replyEmbed], components: [disabledRow] });
        // stop the collector with the reason "done"
        collector.stop("done");
      }

      if (i.customId === "add-money-cancel") {
        replyEmbed.setTitle(
          `${translate.addMoneyCancel.replace("{targetUser}", targetUser?.username || "")}`
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

export const addMoneyCommand = {
  data,
  execute,
};
