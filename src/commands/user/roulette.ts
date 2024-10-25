import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { getBalanceById, getUserBalance } from "../tools/balanceTools";
import { updateMoney } from "../tools/updateMoney";
import { localeCommand, localeMessages } from "../language";
import { getUserDebt } from "../tools/debtTools";
import { checkActiveSeason } from "../tools/blockCommandTools";

const redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
const blackNumbers = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

// row of first, second, third numbers
const firstNumbers = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const secondNumbers = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const thirdNumbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

interface PayoutSettings {
  [key: string]: number;
}

const payoutSettings: PayoutSettings = {
  red: 1,
  black: 1,
  even: 1,
  odd: 1,
  "1-18": 1,
  "19-36": 1,
  "1-12": 2,
  "13-24": 2,
  "25-36": 2,
  "1st": 2,
  "2nd": 2,
  "3rd": 2,
  // singleNumber: 35,
  lose: -1,
  error: 0,
};

const data = new SlashCommandBuilder()
  .setName("gamble-roulette")
  .setDescription("play roulette game")
  .setDescriptionLocalizations(localeCommand.roulette.comDes)
  .addStringOption((option) =>
    option
      .setName("space")
      .setDescription("space to bet on")
      .setDescriptionLocalizations(localeCommand.roulette.spaceDes)
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("bet")
      .setDescription("bet amount")
      .setDescriptionLocalizations(localeCommand.roulette.betDes)
      .setRequired(true)
      .setMinValue(0)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTimestamp()
    .setTitle(`Roulette Game Result`);

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
    if (interaction.channelId !== process.env.DISCORD_CHANNEL_ID_ROULETTE) {
      await interaction.reply({
        content: translate.onlyInRouletteChannel,
        ephemeral: true,
      });
      return;
    }

    const user = interaction.user;

    const userBalanceRes = await getBalanceById(user.id);
    // TODO: multiple user in a game needs to built the key pair of User:bet,User:space

    // check if user has data res in balance table
    if (!userBalanceRes) {
      await interaction.reply({
        content: translate.noBalance,
        ephemeral: true,
      });
      return;
    }

    const bet = interaction.options.getInteger("bet") || 0;
    const space = interaction.options.getString("space") || "";
    const userBalance = Number(userBalanceRes.balance);

    // check if user has enough money
    if (userBalance < bet) {
      await interaction.reply({
        content: translate.noEnoughMoney,
        ephemeral: true,
      });
      return;
    }

    const result = Math.floor(Math.random() * 37); // Roulette numbers are from 0 to 36
    const resultColor =
      result == 0 ? "green" : redNumbers.includes(result) ? "red" : "black";

    // get the resultType
    const judge = (result: number, space: string): string => {
      let resultType = "lose"; // Change this to true if the user wins
      switch (space) {
        case "red":
          if (redNumbers.includes(result)) {
            resultType = "red";
            console.log(resultType);
          }
          break;
        case "black":
          if (blackNumbers.includes(result)) {
            resultType = "black";
            console.log(resultType);
          }
          break;
        case "even":
          if (result !== 0 && result % 2 === 0) {
            resultType = "even";
            console.log(resultType);
          }
          break;
        case "odd":
          if (result % 2 !== 0) {
            resultType = "odd";
            console.log(resultType);
          }
          break;
        case "1-18":
          if (result >= 1 && result <= 18) {
            resultType = "1-18";
            console.log(resultType);
          }
          break;
        case "19-36":
          if (result >= 19 && result <= 36) {
            resultType = "19-36";
            console.log(resultType);
          }
          break;
        case "1-12":
          if (result >= 1 && result <= 12) {
            resultType = "1-12";
            console.log(resultType);
          }
          break;
        case "13-24":
          if (result >= 13 && result <= 24) {
            resultType = "13-24";
            console.log(resultType);
          }
          break;
        case "25-36":
          if (result >= 25 && result <= 36) {
            resultType = "25-36";
            console.log(resultType);
          }
          break;
        case "1st":
          if (firstNumbers.includes(result)) {
            resultType = "1st";
            console.log(resultType);
          }
          break;
        case "2nd":
          if (secondNumbers.includes(result)) {
            resultType = "2nd";
            console.log(resultType);
          }
          break;
        case "3rd":
          if (thirdNumbers.includes(result)) {
            resultType = "3rd";
            console.log(resultType);
          }
          break;
        // default is single number
        default:
          // console.log(isNaN(Number(space)));
          // console.log(Number.isInteger(Number(space)));
          resultType = "error";
          break;
        // if (
        //   isNaN(Number(space)) ||
        //   !Number.isInteger(Number(space)) ||
        //   Number(space) < 0 ||
        //   Number(space) > 36
        // ) {
        //   resultType = "error";
        //   break;
        // }
        // if (result === Number(space)) {
        //   resultType = "singleNumber";
        //   console.log(resultType);
        // }
        // break;
      }
      return resultType;
    };

    // TODO multiple user in a game needs array of resultType, payout

    const resultType = judge(result, space);

    if (resultType === "error") {
      await interaction.reply({
        content: "You entered an invalid space.",
        ephemeral: true,
      });
      return;
    }

    const payout = payoutSettings[resultType] * bet;

    await updateMoney(user.id, payout);

    replyEmbed
      .setDescription(
        `\`\`\`The ball landed on: ${resultColor} ${result}!\`\`\``
      )
      .addFields({
        name: ` Your bet: ${bet}`,
        value: "\n",
      })
      // multiple user may don't set the color
      .setColor(resultType === "lose" ? Colors.Red : Colors.Green)
      .addFields(
        resultType === "lose"
          ? {
              name: `:smiling_face_with_tear:  Sorry, you lost ${bet}. Try again! :smiling_face_with_tear: `,
              value: "\n",
            }
          : {
              name: `:tada: Congratulations! You won ${payout}! :tada:`,
              value: "\n",
            }
      );

    resultEmbed
      .setColor(resultType === "lose" ? Colors.Red : Colors.Green)
      .addFields(
        resultType === "lose"
          ? {
              name: `:smiling_face_with_tear:  Sorry, you lost ${bet}. Try again! :smiling_face_with_tear: `,
              value: "\n",
            }
          : {
              name: `:tada: Congratulations! You won ${payout}! :tada:`,
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

export const rouletteCommand = {
  data,
  execute,
};
