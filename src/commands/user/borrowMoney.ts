import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import {
  createDebt,
  getDebtById,
  updateBorrowed,
  updateDebt,
} from "../tools/debtTools";
import { updateMoney } from "../tools/updateMoney";
import { localeCommand, localeMessages } from "../language";
import { checkActiveSeason } from "../tools/blockCommandTools";

const data = new SlashCommandBuilder()
  .setName("borrow-money")
  .setDescription("borrow money from the bank")
  .setDescriptionLocalizations(localeCommand.borrowMoney.comDes)
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("amount to borrow, max 3000.")
      .setDescriptionLocalizations(localeCommand.borrowMoney.amountDes)
      .setRequired(true)
      .setMinValue(0)
      .setMaxValue(3000)
  );
const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTitle(`${translate.borrowMoney}`)
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

    // get user's debt
    let res = await getDebtById(userId);

    // if there is no user's debt, create it with 0
    if (!res) {
      await createDebt(userId, 0, 0);
      res = await getDebtById(userId);
    }

    // check if the user has borrowed money this season
    if (Number(res?.borrowed) > 0) {
      replyEmbed.addFields(
        {
          name: `${translate.alreadyBorrowed}`,
          value: "\n",
        },
        {
          name: `${translate.onlyBorrowedOnce}`,
          value: "\n",
        }
      );
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // get the amount to borrow
    const amount = interaction.options.getInteger("amount") || 0;

    await updateDebt(userId, amount);
    await updateBorrowed(userId, amount);
    await updateMoney(userId, amount);
    replyEmbed.addFields({
      name: `${translate.borrowSuccess.replace("{amount}", amount.toString())}`,
      value: "\n",
    });

    replyEmbed.addFields({
      name: translate.borrowReminder,
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
    return;
  }
};

export const borrowMoneyCommand = {
  data,
  execute,
};
