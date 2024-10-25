import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import blackjack from "@turel/discord-blackjack";
import { getBalanceById, getUserBalance } from "../tools/balanceTools";
import { updateMoney } from "../tools/updateMoney";
import { localeCommand, localeMessages } from "../language";
import { getUserDebt } from "../tools/debtTools";
import { checkActiveSeason } from "../tools/blockCommandTools";
// need to change the import code index.js line 71
// set what type the message = "interaction" => let commandType="interaction"
const data = new SlashCommandBuilder()
  .setName("gamble-blackjack")
  .setDescription("blackjack game")
  .setDescriptionLocalizations(localeCommand.blackjack.comDes)
  .addIntegerOption((option) =>
    option
      .setName("bet")
      .setDescription("bet amount")
      .setDescriptionLocalizations(localeCommand.blackjack.betDes)
      .setRequired(true)
      .setMinValue(0)
  );
const games = new Set();
const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  /** commandName is typeof string */
  if (interaction.commandName.toLowerCase() === "gamble-blackjack") {
    const replyEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.avatarURL()?.toString(),
      })
      .setTitle(`Blackjack Game Result`)
      .setTimestamp();

    try {
      if (!(await checkActiveSeason())) {
        await interaction.reply({
          content: translate.noActiveSeason,
          ephemeral: true,
        });
        return;
      }

      // hardcoded channel id
      if (
        interaction.channelId !== process.env.DISCORD_CAHNNEL_ID_BLACKJACK &&
        interaction.channelId !== process.env.DISCORD_CAHNNEL_ID_BLACKJACK_2
      ) {
        await interaction.reply({
          content: translate.onlyInBlackjackChannel,
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

      const usingMoney = bet;

      let payout = 0;

      if (games.has(user.id)) {
        await interaction.reply({
          content: translate.alreadyInGame,
          ephemeral: true,
        });
        return;
      }

      // add the user to the games set
      games.add(user.id);
      // console.log("add user to games set", games);

      // start game
      const game = await blackjack(interaction, usingMoney, {
        insurance: false,
        doubledown: false,
        split: false,
        transition: "edit",
      });
      // console.log(game);

      switch (game.result) {
        case "BLACKJACK": {
          // (1:1.5)
          payout = usingMoney * 1.5;
          console.log(
            `User won the game with blackjack, received 1:1.5 payout ${payout}.`
          );
          break;
        }

        case "LOSE": {
          // (1:-1)
          payout = usingMoney * -1;
          console.log(`User lost the game, lost 1:-1 payout ${payout}.`);
          break;
        }

        case "TIE": {
          // (1:0)
          console.log("User tied the game, no payout.");
          break;
        }

        case "WIN": {
          // (1:1)
          payout = usingMoney * 1;
          console.log(`User won the game, received 1:1 payout ${payout}.`);
          break;
        }

        case "DOUBLE WIN": {
          const doubledown = usingMoney * 2;
          // (1:1)
          payout = doubledown * 1;
          console.log(`User won the game, received 1:2 payout ${payout}.`);
          break;
        }

        case "DOUBLE LOSE": {
          const doubledown = usingMoney * 2;
          // (1:-1)
          payout = doubledown * -1;
          console.log(`User lost the game, lost 1:-2 payout ${payout}.`);
          break;
        }

        case "DOUBLE TIE": {
          console.log("User tied the game, no payout.");
          break;
        }

        case "SPLIT WIN-LOSE": {
          const payout1 = usingMoney * 1;
          console.log(`User won the game1, received 1:1 payout ${payout1}.`);

          const payout2 = usingMoney * -1;
          console.log(`User lost the game2, lost 1:-1 payout ${payout2}.`);

          payout = payout1 + payout2;

          break;
        }

        case "SPLIT LOSE-WIN": {
          const payout1 = usingMoney * -1;
          console.log(`User lost the game1, lost 1:-1 payout ${payout1}.`);

          const payout2 = usingMoney * 1;
          console.log(`User won the game2, received 1:1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT TIE-TIE": {
          console.log("User tied the game, no payout.");
          break;
        }

        case "SPLIT WIN-WIN": {
          const payout1 = usingMoney * 1;
          console.log(`User won the game1, received 1:1 payout ${payout1}.`);

          const payout2 = usingMoney * 1;
          console.log(`User won the game2, received 1:1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT LOSE-LOSE": {
          const payout1 = usingMoney * -1;
          console.log(`User lost the game1, lost 1:-1 payout ${payout1}.`);

          const payout2 = usingMoney * -1;
          console.log(`User lost the game2, lost 1:-1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT TIE-WIN": {
          console.log("User tied the game1, no payout.");

          const payout2 = usingMoney * 1;
          console.log(`User won the game2, received 1:1 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT WIN-TIE": {
          const payout1 = usingMoney * 1;
          console.log(`User won the game1, received 1:1 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT TIE-LOSE": {
          console.log("User tied the game1, no payout.");

          const payout2 = usingMoney * -1;
          console.log(`User lost the game2, lost 1:-1 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT LOSE-TIE": {
          const payout1 = usingMoney * -1;
          console.log(`User lost the game1, lost 1:-1 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT BLACKJACK-WIN": {
          const payout1 = usingMoney * 1.5;
          console.log(`User won the game1, received 1:1.5 payout ${payout1}.`);

          const payout2 = usingMoney * 1;
          console.log(`User won the game2, received 1:1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT WIN-BLACKJACK": {
          const payout1 = usingMoney * 1;
          console.log(`User won the game1, received 1:1 payout ${payout1}.`);

          const payout2 = usingMoney * 1.5;
          console.log(`User won the game2, received 1:1.5 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT BLACKJACK-LOSE": {
          const payout1 = usingMoney * 1.5;
          console.log(`User won the game1, received 1:1.5 payout ${payout1}.`);

          const payout2 = usingMoney * -1;
          console.log(`User lost the game2, lost 1:-1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT LOSE-BLACKJACK": {
          const payout1 = usingMoney * -1;
          console.log(`User lost the game1, lost 1:-1 payout ${payout1}.`);

          const payout2 = usingMoney * 1.5;
          console.log(`User won the game2, received 1:1.5 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT BLACKJACK-BLACKJACK": {
          const payout1 = usingMoney * 1.5;
          console.log(`User won the game1, received 1:1.5 payout ${payout1}.`);

          const payout2 = usingMoney * 1.5;
          console.log(`User won the game2, received 1:1.5 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT BLACKJACK-TIE": {
          const payout1 = usingMoney * 1.5;
          console.log(`User won the game1, received 1:1.5 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT TIE-BLACKJACK": {
          console.log("User tied the game1, no payout.");

          const payout2 = usingMoney * 1.5;
          console.log(`User won the game2, received 1:1.5 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT DOUBLE WIN-LOSE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1;
          console.log(`User won the game1, received 1:2 payout ${payout1}.`);

          const payout2 = usingMoney * -1;
          console.log(`User lost the game2, lost 1:-1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE LOSE-WIN": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * -1;
          console.log(`User lost the game1, lost 1:-2 payout ${payout1}.`);

          const payout2 = usingMoney * 1;
          console.log(`User won the game2, received 1:1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE TIE-TIE": {
          console.log("User tied the game1, no payout.");

          console.log("User tied the game2, no payout.");
          break;
        }

        case "SPLIT DOUBLE WIN-WIN": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1;
          console.log(`User won the game1, received 1:2 payout ${payout1}.`);

          const payout2 = usingMoney * 1;
          console.log(`User won the game2, received 1:1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE LOSE-LOSE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * -1;
          console.log(`User lost the game1, lost 1:-2 payout ${payout1}.`);

          const payout2 = usingMoney * -1;
          console.log(`User lost the game2, lost 1:-1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE TIE-WIN": {
          console.log("User tied the game1, no payout.");

          const payout2 = usingMoney * 1;
          console.log(`User won the game2, received 1:1 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT DOUBLE WIN-TIE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1;
          console.log(`User won the game1, received 1:2 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT DOUBLE TIE-LOSE": {
          console.log("User tied the game1, no payout.");

          const payout2 = usingMoney * -1;
          console.log(`User lost the game2, lost 1:-1 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT DOUBLE LOSE-TIE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * -1;
          console.log(`User lost the game1, lost 1:-2 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT DOUBLE BLACKJACK-WIN": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1.5;
          console.log(`User won the game1, received 1:3 payout ${payout1}.`);

          const payout2 = usingMoney * 1;
          console.log(`User won the game2, received 1:1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE WIN-BLACKJACK": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1;
          console.log(`User won the game1, received 1:2 payout ${payout1}.`);

          const payout2 = usingMoney * 1.5;
          console.log(`User won the game2, received 1:1.5 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE BLACKJACK-LOSE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1.5;
          console.log(`User won the game1, received 1:3 payout ${payout1}.`);

          const payout2 = usingMoney * -1;
          console.log(`User lost the game2, lost 1:-1 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE LOSE-BLACKJACK": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * -1;
          console.log(`User lost the game1, lost 1:-2 payout ${payout1}.`);

          const payout2 = usingMoney * 1.5;
          console.log(`User won the game2, received 1:1.5 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE BLACKJACK-BLACKJACK": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1.5;
          console.log(`User won the game1, received 1:3 payout ${payout1}.`);

          const payout2 = usingMoney * 1.5;
          console.log(`User won the game2, received 1:1.5 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE BLACKJACK-TIE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1.5;
          console.log(`User won the game1, received 1:3 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT DOUBLE TIE-BLACKJACK": {
          console.log("User tied the game1, no payout.");

          const payout2 = usingMoney * 1.5;
          console.log(`User won the game2, received 1:1.5 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT WIN-DOUBLE LOSE": {
          const payout1 = usingMoney * 1;
          console.log(`User won the game1, received 1:1 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * -1;
          console.log(`User lost the game2, lost 1:-2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT LOSE-DOUBLE WIN": {
          const payout1 = usingMoney * -1;
          console.log(`User lost the game1, lost 1:-1 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT TIE-DOUBLE TIE": {
          console.log("User tied the game1, no payout.");

          console.log("User tied the game2, no payout.");
          break;
        }

        case "SPLIT WIN-DOUBLE WIN": {
          const payout1 = usingMoney * 1;
          console.log(`User won the game1, received 1:1 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT LOSE-DOUBLE LOSE": {
          const payout1 = usingMoney * -1;
          console.log(`User lost the game1, lost 1:-1 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * -1;
          console.log(`User lost the game2, lost 1:-2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT TIE-DOUBLE WIN": {
          console.log("User tied the game1, no payout.");

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT WIN-DOUBLE TIE": {
          const payout1 = usingMoney * 1;
          console.log(`User won the game1, received 1:1 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT TIE-DOUBLE LOSE": {
          console.log("User tied the game1, no payout.");

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * -1;
          console.log(`User lost the game2, lost 1:-2 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT LOSE-DOUBLE TIE": {
          const payout1 = usingMoney * -1;
          console.log(`User lost the game1, lost 1:-1 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT BLACKJACK-DOUBLE WIN": {
          const payout1 = usingMoney * 1.5;
          console.log(`User won the game1, received 1:1.5 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT WIN-DOUBLE BLACKJACK": {
          const payout1 = usingMoney * 1;
          console.log(`User won the game1, received 1:1 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1.5;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT BLACKJACK-DOUBLE LOSE": {
          const payout1 = usingMoney * 1.5;
          console.log(`User won the game1, received 1:1.5 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * -1;
          console.log(`User lost the game2, lost 1:-2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT LOSE-DOUBLE BLACKJACK": {
          const payout1 = usingMoney * -1;
          console.log(`User lost the game1, lost 1:-1 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1.5;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT BLACKJACK-DOUBLE BLACKJACK": {
          const payout1 = usingMoney * 1.5;
          console.log(`User won the game1, received 1:1.5 payout ${payout1}.`);

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1.5;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT BLACKJACK-DOUBLE TIE": {
          const payout1 = usingMoney * 1.5;
          console.log(`User won the game1, received 1:1.5 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT TIE-DOUBLE BLACKJACK": {
          console.log("User tied the game1, no payout.");

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1.5;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT DOUBLE WIN-DOUBLE LOSE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1;
          console.log(`User won the game1, received 1:2 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * -1;
          console.log(`User lost the game2, lost 1:-2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE LOSE-DOUBLE WIN": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * -1;
          console.log(`User lost the game1, lost 1:-2 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * 1;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE TIE-DOUBLE TIE": {
          console.log("User tied the game1, no payout.");

          console.log("User tied the game2, no payout.");
          break;
        }

        case "SPLIT DOUBLE WIN-DOUBLE WIN": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1;
          console.log(`User won the game1, received 1:2 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * 1;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE LOSE-DOUBLE LOSE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * -1;
          console.log(`User lost the game1, lost 1:-2 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * -1;
          console.log(`User lost the game2, lost 1:-2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE TIE-DOUBLE WIN": {
          console.log("User tied the game1, no payout.");

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT DOUBLE WIN-DOUBLE TIE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1;
          console.log(`User won the game1, received 1:2 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT DOUBLE TIE-DOUBLE LOSE": {
          console.log("User tied the game1, no payout.");

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * -1;
          console.log(`User lost the game2, lost 1:-2 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "SPLIT DOUBLE LOSE-DOUBLE TIE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * -1;
          console.log(`User lost the game1, lost 1:-2 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT DOUBLE BLACKJACK-DOUBLE WIN": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1.5;
          console.log(`User won the game1, received 1:3 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * 1;
          console.log(`User won the game2, received 1:2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE WIN-DOUBLE BLACKJACK": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1;
          console.log(`User won the game1, received 1:2 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * 1.5;
          console.log(`User won the game2, received 1:3 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE BLACKJACK-DOUBLE LOSE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1.5;
          console.log(`User won the game1, received 1:3 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * -1;
          console.log(`User lost the game2, lost 1:-2 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE LOSE-DOUBLE BLACKJACK": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * -1;
          console.log(`User lost the game1, lost 1:-2 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * 1.5;
          console.log(`User won the game2, received 1:3 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE BLACKJACK-DOUBLE BLACKJACK": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1.5;
          console.log(`User won the game1, received 1:3 payout ${payout1}.`);

          const doubledown2 = usingMoney * 2;
          const payout2 = doubledown2 * 1.5;
          console.log(`User won the game2, received 1:3 payout ${payout2}.`);

          payout = payout1 + payout2;
          break;
        }

        case "SPLIT DOUBLE BLACKJACK-DOUBLE TIE": {
          const doubledown = usingMoney * 2;
          const payout1 = doubledown * 1.5;
          console.log(`User won the game1, received 1:3 payout ${payout1}.`);

          console.log("User tied the game2, no payout.");

          payout = payout1;
          break;
        }

        case "SPLIT DOUBLE TIE-DOUBLE BLACKJACK": {
          console.log("User tied the game1, no payout.");

          const doubledown = usingMoney * 2;
          const payout2 = doubledown * 1.5;
          console.log(`User won the game2, received 1:3 payout ${payout2}.`);

          payout = payout2;
          break;
        }

        case "CANCEL": {
          payout = usingMoney * -1;
          console.log(`User canceled the game, lost 1:-1 payout ${payout}.`);

          break;
        }

        case "TIMEOUT": {
          payout = usingMoney * -1;
          console.log(`User timed out, lost 1:-1 payout ${payout}.`);
          break;
        }

        default: {
          /** construct and throw a semi-custom Error */
          const e = new Error();
          e.name = "IllegalState";
          e.message = "Failed to get result state of blackjack, weird.";
          throw e;
        }
      }

      await updateMoney(user.id, payout);
      games.delete(user.id);
      // console.log("deleted user from games set", games);

      if (payout === 0) {
        replyEmbed
          .addFields({
            name: `:smiling_face: ${translate.tieBjGame} :smiling_face:`,
            value: "\n",
          })
          .setColor(Colors.Blue);
      }

      if (payout > 0) {
        replyEmbed
          .addFields({
            name: `:tada: ${translate.winBjGame} ${Math.abs(payout)} :tada:`,
            value: "\n",
          })
          .setColor(Colors.Green);
      }

      if (payout < 0) {
        replyEmbed
          .addFields({
            name: `:smiling_face_with_tear: ${translate.loseBjGame} ${Math.abs(payout)} :smiling_face_with_tear: `,
            value: "\n",
          })
          .setColor(Colors.Red);
      }

      replyEmbed
        .addFields({
          name: translate.balance,
          value: `\`\`\` ${await getUserBalance(user.id)} \`\`\``,
          inline: true,
        })
        .addFields({
          name: translate.debt,
          value: `\`\`\`diff\n- ${await getUserDebt(user.id)} \`\`\``,
          inline: true,
        });

      await interaction.followUp({
        embeds: [replyEmbed],
        ephemeral: true,
      });

      return;
    } catch (error) {
      console.error(error);
    }
  }
};
export const blackjackCommand = {
  data,
  execute,
};
