import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { localeCommand, localeMessages } from "../language";
import { getAllSerialCode, toCSV } from "../tools/serialCodeTools";

const data = new SlashCommandBuilder()
  .setName("check-serial-code")
  .setDescription("output all user serial codes")
  .setDescriptionLocalizations(localeCommand.checkSerialCode.comDes);

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    if (!interaction.guild) {
      await interaction.reply({
        content: `${translate.nullGuild}`,
        ephemeral: true,
      });
      return;
    }

    // await snapshot(interaction.guild);
    const allSerialCode = (await getAllSerialCode()) || [];
    console.log("allSerialCode:", allSerialCode);

    if (allSerialCode.length === 0) {
      await interaction.reply({
        content: `No serial code found.`,
        ephemeral: true,
      });
      return;
    }

    const csvOutput = toCSV(allSerialCode);

    await interaction.reply({
      files: [csvOutput],
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

export const checkSerialCodeCommand = {
  data,
  execute,
};
