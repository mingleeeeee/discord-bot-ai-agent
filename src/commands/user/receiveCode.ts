import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { localeCommand, localeMessages } from "../language";
import {
  checkSerialCodeUser,
  createSerialCode,
  sixDigitCodeGen,
} from "../tools/serialCodeTools";
import { checkActiveSeason } from "../tools/blockCommandTools";
const data = new SlashCommandBuilder()
  .setName("receive-serial-code")
  .setDescription("for the MT holder to receive the serial code")
  .setDescriptionLocalizations(localeCommand.receiveCode.comDes);

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTitle(translate.serialCode)
    .setTimestamp();

  try {
    if (!(await checkActiveSeason())) {
      await interaction.reply({
        content: translate.noActiveSeason,
        ephemeral: true,
      });
      return;
    }

    if (interaction.channelId !== process.env.DISCORD_CHANNEL_ID_MTHOLDER) {
      await interaction.reply({
        content: translate.onlyIbSerialCode,
        ephemeral: true,
      });
      return;
    }

    const userId = interaction.user.id;

    // Check if the user already has a serial number
    const hasCode = (await checkSerialCodeUser(userId)) || null;
    if (hasCode) {
      replyEmbed.addFields({
        // not set yet
        name: translate.alreadyHasSerialCode,
        value: hasCode,
      });
      await interaction.reply({
        embeds: [replyEmbed],
        ephemeral: true,
      });
      return;
    }

    // if not, generate a code and store it in the database
    const newCode = await sixDigitCodeGen();
    await createSerialCode(userId, newCode);

    replyEmbed.addFields({
      name: translate.yourSerialCode,
      value: newCode,
    });

    await interaction.reply({
      embeds: [replyEmbed],
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

export const receiveCodeCommand = {
  data,
  execute,
};
