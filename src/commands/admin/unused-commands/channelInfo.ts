import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { ChannelDBDataSource } from "@/sasat/dataSources/db/Channel";
import { checkAdmin } from "@/commands/tools/checkRole";

const data = new SlashCommandBuilder()
  .setName("channel-info")
  .setDescription("get chat money channel informatioin");

const execute: Command = async (interaction) => {
  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Channel-Info")
    .setTimestamp();

  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`You are not admin.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }
    const getChannelInfo = await new ChannelDBDataSource().find({
      fields: ["channelId", "amount", "cooldown", "status"],
    });
    // console.log("getChannelInfo:", getChannelInfo);

    //if there is no user
    if (!getChannelInfo.length) {
      replyEmbed.setTitle(`There is no channel information.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // list all items in the store
    for (const channel of getChannelInfo) {
      const fetchChannel = await interaction.guild?.channels.fetch(
        channel.channelId
      );

      replyEmbed.addFields({
        name: `\n`,
        value: `Channel: ${fetchChannel?.name}, Chat money:${channel.amount}, Cooldown:${channel.cooldown}, Status:${channel.status}`,
        inline: false,
      });
    }

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

export const channelInfoCommand = {
  data,
  execute,
};
