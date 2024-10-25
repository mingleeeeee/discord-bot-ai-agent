import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "@/commands/commands";
import { localeCommand, localeMessages } from "../language";
import { checkActiveSeason } from "../tools/blockCommandTools";

const data = new SlashCommandBuilder()
  .setName("connect-x")
  .setDescription("connect to x (twitter)")
  .setDescriptionLocalizations(localeCommand.connectX.comDes);
const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(translate.connectX)
    .setTimestamp();

  try {
    if (!(await checkActiveSeason())) {
      await interaction.reply({
        content: translate.noActiveSeason,
        ephemeral: true,
      });
      return;
    }

    const tweeter = new ButtonBuilder()
      .setLabel("Connect")
      .setStyle(ButtonStyle.Link)
      .setURL(
        `${process.env.PUBLIC_IPv4_DNS_URL}/auth/twitter?userDiscordId=` +
          interaction.user.id
      );
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(tweeter);

    await interaction.reply({
      embeds: [replyEmbed],
      components: [row],
      ephemeral: true,
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

export const connectXCommand = {
  data,
  execute,
};
