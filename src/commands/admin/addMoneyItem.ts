import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { updateMoney } from "@/commands/tools/updateMoney";
import { localeCommand, localeMessages } from "../language";
import { getItemByName } from "../tools/itemTools";
import { getItemBalanceByItemId } from "../tools/itemBalanceTools";

const data = new SlashCommandBuilder()
  .setName("add-money-item-holder")
  .setDescription("add money to item holder")
  .setDescriptionLocalizations(localeCommand.addMoneyItem.comDes)
  .addStringOption((option) =>
    option
      .setName("item")
      .setDescription("The holding item")
      .setDescriptionLocalizations(localeCommand.addMoneyItem.itemDes)
      // must input option
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("value")
      .setDescription("The value to add")
      .setDescriptionLocalizations(localeCommand.addMoneyItem.valueDes)
      .setRequired(true)
      .setMinValue(0)
  );

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

    const targetItem = interaction.options.getString("item") || "";
    const addValue = Number(interaction.options.getInteger("value"));

    const getTargetItem = (await getItemByName(targetItem)) || [];

    // if the item not exist
    if (!getTargetItem.length) {
      replyEmbed.setTitle(`${translate.noItem}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const targetItemId = getTargetItem[0].id;
    const getItemHolder = (await getItemBalanceByItemId(targetItemId)) || [];

    // if the item holder not exist
    if (!getItemHolder.length) {
      replyEmbed.setTitle(`${translate.noItemHolder}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // multiple the addValue with the item holder balance
    getItemHolder.forEach((item) => {
      const targetUserId = item.userId || "";
      const balance = item.balance || 0;
      const totalValue = balance * addValue;
      updateMoney(targetUserId, totalValue);
    });

    replyEmbed.setTitle(
      `${translate.addMoneyToItemHolder.replace("{addValue}", addValue.toString()).replace("{targetItem}", targetItem)}`
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

export const addMoneyItemCommand = {
  data,
  execute,
};
