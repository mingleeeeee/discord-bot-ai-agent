import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { snapshot } from "../tools/statsTools";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("check-stats")
  .setDescription("output all user stats")
  .setDescriptionLocalizations(localeCommand.checkStats.comDes);

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

    await snapshot(interaction.guild);

    await interaction.reply({
      content: `${translate.checkSnapShot}`,
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

export const checkStatsCommand = {
  data,
  execute,
};
