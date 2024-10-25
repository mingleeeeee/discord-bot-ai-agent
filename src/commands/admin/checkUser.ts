import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { BalanceDBDataSource } from "@/sasat/dataSources/db/Balance";
import { CurrencyDBDataSource } from "@/sasat/dataSources/db/Currency";
import { unicodeToEmoji } from "@/commands/tools/checkEmoji";
import { DebtDBDataSource } from "@/sasat/dataSources/db/Debt";
import { localeCommand, localeMessages } from "../language";
import { checkAdmin } from "../tools/checkRole";
const data = new SlashCommandBuilder()
  .setName("check-user")
  .setDescription("check user's balance")
  .setDescriptionLocalizations(localeCommand.checkUser.comDes)
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The user to check")
      .setDescriptionLocalizations(localeCommand.checkUser.targetDes)
      .setRequired(true)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(translate.balanceAndDebt)
    .setTimestamp();

  try {
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const targetUser = interaction.options.getUser("target");
    const targetUserId = targetUser?.id || "";
    const getBalanceById = await new BalanceDBDataSource().findById(
      targetUserId,
      { fields: ["id", "balance"] },
      { lock: "FOR UPDATE" }
    );
    const getDebtById = await new DebtDBDataSource().findById(
      targetUserId,
      { fields: ["id", "balance"] },
      { lock: "FOR UPDATE" }
    );

    const getCurrencySymbol = await new CurrencyDBDataSource().findById(
      1,
      { fields: ["id", "symbol"] },
      { lock: "FOR UPDATE" }
    );
    const currencySymbol = getCurrencySymbol?.symbol || "";
    const currencySymbolConvert = unicodeToEmoji(currencySymbol);

    // if there is no user's balance
    if (!getBalanceById) {
      replyEmbed.addFields({
        name: translate.noBalance,
        value: "\n",
      });
      await interaction.reply({
        embeds: [replyEmbed],
      });
      return;
    }

    // if there is no user's debt
    if (!getDebtById) {
      replyEmbed.addFields({
        name: translate.noDebt,
        value: "\n",
      });
      await interaction.reply({
        embeds: [replyEmbed],
      });
      return;
    }

    replyEmbed.addFields(
      {
        name: translate.balance,
        value: `${currencySymbolConvert} ${getBalanceById.balance}`,
      },
      {
        name: translate.debt,
        value: `${currencySymbolConvert} ${getDebtById.balance}`,
      }
    );

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

export const checkUserCommand = {
  data,
  execute,
};
