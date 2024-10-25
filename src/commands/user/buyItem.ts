import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { BalanceDBDataSource } from "@/sasat/dataSources/db/Balance";
import { getItemByName, updateItem } from "../tools/itemTools";
import {
  createUserItemBalance,
  getUserItemBalance,
  updateUserItemBalance,
} from "../tools/itemBalanceTools";
import { localeCommand, localeMessages } from "../language";
import { checkActiveSeason } from "../tools/blockCommandTools";

const data = new SlashCommandBuilder()
  .setName("buy-item")
  .setDescription("buy item from store")
  .setDescriptionLocalizations(localeCommand.buyItem.comDes)
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("item name")
      .setDescriptionLocalizations(localeCommand.buyItem.nameDes)
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("amount to buy")
      .setDescriptionLocalizations(localeCommand.buyItem.amountDes)
      .setRequired(true)
      .setMinValue(1)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Buy item`)
    .setTimestamp();

  try {
    if (!(await checkActiveSeason())) {
      await interaction.reply({
        content: translate.noActiveSeason,
        ephemeral: true,
      });
      return;
    }

    const userId = interaction.user.id;
    const getBuyItemName = interaction.options.getString("name") || "";
    const getBuyAmount = Number(interaction.options.getInteger("amount"));

    const getItemData = (await getItemByName(getBuyItemName)) || [];

    // if the item is not in the item table
    if (!getItemData?.length) {
      replyEmbed.addFields({
        name: `${translate.itemNotInStore.replace("{getBuyItemName}", getBuyItemName)}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const {
      id: itemId,
      name: itemName,
      balance,
      price,
      status,
      maxiumPerPesron,
    } = getItemData[0];

    // if the item is deleted
    if (status === "deleted") {
      replyEmbed.addFields({
        name: `${translate.itemDeleted.replace("{getBuyItemName}", getBuyItemName)}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const res = await getUserItemBalance(itemId, userId);
    const userItemBalance = res?.length ? Number(res[0].balance) : 0;

    // if the user has item balance and the balance+buyAmount is less than the maxiumPerPesron
    if (userItemBalance + getBuyAmount > Number(maxiumPerPesron)) {
      replyEmbed.addFields({
        name: `${translate.itemExceedMaxiumPerPesron
          .replace("{maxiumPerPesron}", Number(maxiumPerPesron).toString())
          .replace("{itemName}", itemName || "")
          .replace("{userItemBalance}", userItemBalance.toString())
          .replace(
            "{remain}",
            (Number(maxiumPerPesron) - userItemBalance).toString()
          )}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const totalPrice = Number(price) * getBuyAmount;
    const afterBuyBalance = Number(balance) - getBuyAmount;
    console.log("afterBuyBalance", afterBuyBalance);
    // if the item's balance < 0 after buying
    if (afterBuyBalance < 0) {
      replyEmbed.addFields({
        name: `${translate.itemNotEnough.replace("{itemName}", itemName || "")}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const balanceDb = new BalanceDBDataSource();
    const getBalanceById = await balanceDb.findById(
      userId,
      { fields: ["balance", "id"] },
      { lock: "FOR UPDATE" }
    );

    // if the user doen not has enough balance to buy the item
    if (!getBalanceById || totalPrice > Number(getBalanceById?.balance)) {
      replyEmbed.addFields({
        name: `${translate.noEnoughMoney}`,
        value: "\n",
      });

      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // create or update user's item balance in the itemBalance table
    if (!res?.length) {
      await createUserItemBalance(itemId, userId, getBuyAmount);
    } else {
      await updateUserItemBalance(res[0].id, userItemBalance + getBuyAmount);
    }

    // update item table balance column
    await updateItem(itemId, { balance: afterBuyBalance });

    // update user's money
    await balanceDb.update({
      id: userId,
      balance: Number(getBalanceById?.balance) - totalPrice,
    });

    replyEmbed.addFields({
      name: `${translate.userBuyItem.replace("{getBuyAmount}", getBuyAmount.toString()).replace("{itemName}", itemName || "")}`,
      value: "\n",
    });
    await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
    return;
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: translate.somethingWrong,
      ephemeral: true,
    });
  }
};

export const buyItemCommand = {
  data,
  execute,
};
