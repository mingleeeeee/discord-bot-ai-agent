import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { BalanceDBDataSource } from "@/sasat/dataSources/db/Balance";
import { CurrencyDBDataSource } from "@/sasat/dataSources/db/Currency";
import { unicodeToEmoji } from "@/commands/tools/checkEmoji";
import { DebtDBDataSource } from "@/sasat/dataSources/db/Debt";
import { localeCommand, localeMessages } from "../language";
import { checkActiveSeason } from "../tools/blockCommandTools";
const data = new SlashCommandBuilder()
  .setName("check-balance")
  .setDescription("check your balance")
  .setDescriptionLocalizations(localeCommand.balance.comDes);
const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTitle(translate.balanceAndDebt)
    .setTimestamp();

  // console.log(interaction.locale);
  try {
    // hardcoded channel id
    // if (interaction.channelId !== "1203005474753089587") {
    //   await interaction.reply({
    //     content: (translate)
    //       .onlyInCheckStatus,
    //     ephemeral: true,
    //   });
    //   return;
    // }

    if (!(await checkActiveSeason())) {
      await interaction.reply({
        content: translate.noActiveSeason,
        ephemeral: true,
      });
      return;
    }

    const userId = interaction.user.id;
    const getBalanceById = await new BalanceDBDataSource().findById(
      userId,
      { fields: ["id", "balance"] },
      { lock: "FOR UPDATE" }
    );
    const getDebtById = await new DebtDBDataSource().findById(
      userId,
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
        value: `\`\`\` ${currencySymbolConvert} ${getBalanceById.balance} \`\`\``,
        inline: true,
      },
      {
        name: translate.debt,
        value: `\`\`\`diff\n- ${currencySymbolConvert} ${getDebtById.balance}\n\`\`\``,
        inline: true,
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

export const balanceCommand = {
  data,
  execute,
};
