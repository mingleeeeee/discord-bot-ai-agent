import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { getBalanceById, getUserBalance } from "../tools/balanceTools";
import { updateMoney } from "../tools/updateMoney";
import { MiniGameDBDataSource } from "@/sasat/dataSources/db/MiniGame";
import { localeCommand, localeMessages } from "../language";
import { getUserDebt } from "../tools/debtTools";
import { checkActiveSeason } from "../tools/blockCommandTools";

const data = new SlashCommandBuilder()
  .setName("gamble-slot")
  .setDescription("play slot game")
  .setDescriptionLocalizations(localeCommand.slot.comDes)
  .addIntegerOption((option) =>
    option
      .setName("bet")
      .setDescription("bet amount")
      .setDescriptionLocalizations(localeCommand.slot.betDes)
      .setRequired(true)
      .setMinValue(0)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTimestamp()
    .setTitle(`Slot Game Result`);

  const resultEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL()?.toString(),
    })
    .setTimestamp()
    .setTitle(`Roulette Game Result`);

  try {
    if (!(await checkActiveSeason())) {
      await interaction.reply({
        content: translate.noActiveSeason,
        ephemeral: true,
      });
      return;
    }

    // hardcoded channel id
    if (interaction.channelId !== process.env.DISCORD_CHANNEL_ID_SLOT) {
      await interaction.reply({
        content: translate.onlyInSlotChannel,
        ephemeral: true,
      });
      return;
    }

    const user = interaction.user;

    const userBalanceRes = await getBalanceById(user.id);
    // check if user has data res in balance table
    if (!userBalanceRes) {
      await interaction.reply({
        content: translate.noBalance,
        ephemeral: true,
      });
      return;
    }
    const bet = interaction.options.getInteger("bet") || 0;
    const userBalance = Number(userBalanceRes.balance);

    // check if user has enough money
    if (userBalance < bet) {
      await interaction.reply({
        content: translate.noEnoughMoney,
        ephemeral: true,
      });
      return;
    }

    // Slot game logic
    const emojis = ["🍎", "🍌", "🍒", "🍓", "🍊"];

    // 2 is the id for slot game
    const getSlotRes = await new MiniGameDBDataSource().findById(
      2,
      { fields: ["id", "winRate"] },
      { lock: "FOR UPDATE" }
    );
    const winRate = Number(getSlotRes?.winRate || 50);
    const winningChance = winRate / 100; // Adjust this to change the winning chance
    const isWinning = Math.random() < winningChance;
    const grid = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));

    if (isWinning) {
      const winningEmojiIndex = Math.floor(Math.random() * emojis.length);
      const winningEmoji = emojis[winningEmojiIndex];
      emojis.splice(winningEmojiIndex, 1); // Remove the winning emoji from the array
      grid[1] = Array(3).fill(winningEmoji); // Fill the middle row with the winning emoji
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === null) {
          let emoji;
          do {
            emoji = emojis[Math.floor(Math.random() * emojis.length)];
          } while (
            grid[i].includes(emoji) ||
            (grid[0][0] === emoji && i === j) ||
            (grid[0][2] === emoji && i === 2 - j)
          );
          grid[i][j] = emoji;
        }
      }
    }

    const result = grid
      .map((row, index) =>
        index === 1 ? row.join(" ") + " ⬅" : row.join(" ")
      )
      .join("\n");

    const payout = bet * 1;

    if (isWinning) {
      await updateMoney(user.id, payout);
    }
    // if losing
    else {
      await updateMoney(user.id, -payout);
    }

    replyEmbed
      .addFields({
        name: `Your bet: ${bet}`,
        value: "\n",
      })
      .setDescription(`\`\`\`${result}\`\`\``)
      .setColor(isWinning ? "Green" : "Red")
      .addFields(
        isWinning
          ? {
              name: `:tada: Congratulations! You won ${payout}! :tada:`,
              value: "\n",
            }
          : {
              name: `:smiling_face_with_tear:  Sorry, you lost ${payout}. Try again! :smiling_face_with_tear: `,
              value: "\n",
            }
      );

    resultEmbed
      .setColor(isWinning ? "Green" : "Red")
      .addFields(
        isWinning
          ? {
              name: `:tada: Congratulations! You won ${payout}! :tada:`,
              value: "\n",
            }
          : {
              name: `:smiling_face_with_tear:  Sorry, you lost ${payout}. Try again! :smiling_face_with_tear: `,
              value: "\n",
            }
      )
      .addFields({
        name: (localeMessages[interaction.locale] ?? localeMessages.en).balance,
        value: `\`\`\` ${await getUserBalance(user.id)} \`\`\``,
        inline: true,
      })
      .addFields({
        name: (localeMessages[interaction.locale] ?? localeMessages.en).debt,
        value: `\`\`\`diff\n- ${await getUserDebt(user.id)} \`\`\``,
        inline: true,
      });

    await interaction.reply({
      embeds: [replyEmbed],
    });

    await interaction.followUp({
      embeds: [resultEmbed],
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

export const slotCommand = {
  data,
  execute,
};
