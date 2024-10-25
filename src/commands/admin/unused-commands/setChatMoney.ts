import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { ChannelDBDataSource } from "@/sasat/dataSources/db/Channel";

const data = new SlashCommandBuilder()
  .setName("set-chat-money")
  .setDescription("set the chat money info")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("The channel to set")
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("The amount money to get in chat")
      .setRequired(true)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("cooldown")
      .setDescription("The cooldown time in chat (seconds))")
      .setRequired(true)
      .setMinValue(0)
  )
  .addStringOption((option) =>
    option
      .setName("status")
      .setDescription("The status of the chat money")
      .setRequired(true)
      .addChoices(
        { name: "active", value: "active" },
        { name: "inactive", value: "inactive" },
        { name: "deleted", value: "deleted" }
      )
  );

const execute: Command = async (interaction) => {
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();
  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`You are not admin.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const targetChannel = interaction.options.getChannel("channel");
    const targetAmount = Number(interaction.options.getInteger("amount"));
    const targetCooldown = Number(interaction.options.getInteger("cooldown"));
    const targetStatus = interaction.options.getString("status") || "";
    const targetChannelId = targetChannel?.id || "";

    // check if the channel is already in the db
    const getChannelById = await new ChannelDBDataSource().findByChannelId(
      targetChannelId
    );

    if (!getChannelById) {
      await new ChannelDBDataSource().create({
        channelId: targetChannelId,
        amount: targetAmount,
        cooldown: targetCooldown,
        status: targetStatus,
      });

      replyEmbed.setTitle(
        `Set channel ${targetChannel?.name}, chat amount ${targetAmount}, chat cooldown ${targetCooldown}, chat status ${targetStatus}. `
      );
      await interaction.reply({ embeds: [replyEmbed] });

      return;
    }

    // if the channel is already in the db
    await new ChannelDBDataSource().update({
      channelId: targetChannelId,
      amount: targetAmount,
      cooldown: targetCooldown,
      status: targetStatus,
    });

    replyEmbed.setTitle(
      `Set channel ${targetChannel?.name}, chat amount ${targetAmount}, chat cooldown ${targetCooldown}, chat status ${targetStatus}. `
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

export const setChatMoneyCommand = {
  data,
  execute,
};
