import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { getTweetIdFromUrl } from "@/commands/tools/getTweeterId";
import { TweetDBDataSource } from "@/sasat/dataSources/db/Tweet";
import { ExpireTweetDBDataSource } from "@/sasat/dataSources/db/ExpireTweet";
import toMilliseconds from "@sindresorhus/to-milliseconds";
import parseMilliseconds from "parse-ms";

const data = new SlashCommandBuilder()
  .setName("set-tweet")
  .setDescription("set the tweet")
  .addStringOption((option) =>
    option
      .setName("tweeturl")
      .setDescription("The tweet to retweet")
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("day")
      .setDescription("The days to expire")
      .setRequired(false)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("hour")
      .setDescription("The hours to expire")
      .setRequired(false)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("minute")
      .setDescription("The minute to expire")
      .setRequired(false)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("second")
      .setDescription("The seconds to expire")
      .setRequired(false)
      .setMinValue(0)
  );
// https://x.com/TOKYOBEAST_EN/status/1749350518122766733?s=20
// http://localhost:3400/redirect?url=https%3A%2F%2Ftwitter.com%2Fintent%2Fretweet%3Ftweet_id%3D1749350518122766733
const execute: Command = async (interaction) => {
  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("The Post")
    .setTimestamp();

  try {
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`You are not admin.`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const getDay = Number(interaction.options.getInteger("day"));
    const getHour = Number(interaction.options.getInteger("hour"));
    const getMin = Number(interaction.options.getInteger("minute"));
    const getSec = Number(interaction.options.getInteger("second"));
    const now = Date.now();

    // set expire time. if no input, set it to 24 hours
    const totalMs =
      toMilliseconds({
        days: getDay,
        hours: getHour,
        minutes: getMin,
        seconds: getSec,
      }) == 0
        ? toMilliseconds({
            hours: 24,
          })
        : toMilliseconds({
            days: getDay,
            hours: getHour,
            minutes: getMin,
            seconds: getSec,
          });
    const expireAt = now + totalMs;
    const countDown = parseMilliseconds(totalMs);
    const tweetUrl = interaction.options.getString("tweeturl");
    const tweetId = getTweetIdFromUrl(tweetUrl || "");

    const tweetDb = new TweetDBDataSource();
    const expireTweetDb = new ExpireTweetDBDataSource();
    const getTweetByTweetId = await tweetDb.findByTweetId(tweetId);

    const tweeter = new ButtonBuilder()
      // set button customId as tweetId
      .setCustomId(tweetId)
      .setLabel("twitter")
      .setEmoji("🐦")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(tweeter);
    // if the tweet is not in the tweet table, create it in both tweet table and expire tweet table
    if (!getTweetByTweetId) {
      await tweetDb
        .create({
          tweetId: tweetId,
        })
        .then(async (res) => {
          await expireTweetDb.create({
            tweetId: res.tweetId,
            expireAt: expireAt.toString(),
          });
        });

      await interaction.reply({
        content: `\nTweet: ${
          tweetUrl || ""
        } \nEngage To Get Your Point \nEnds: ${countDown.days} days ${
          countDown.hours
        } hours ${countDown.minutes} minutes ${
          countDown.seconds
        } seconds \n@everyone`,
        components: [row],
        allowedMentions: { parse: ["everyone"] },
      });
      return;
    }

    // if the tweet is in the tweet table, update the expire time
    await expireTweetDb.update({
      tweetId: tweetId,
      expireAt: expireAt.toString(),
    });

    await interaction.reply({
      content: `\nTweet: ${tweetUrl || ""} \nEngage To Get Your Point \nEnds: ${
        countDown.days
      } days ${countDown.hours} hours ${countDown.minutes} minutes ${
        countDown.seconds
      } seconds \n@everyone`,
      components: [row],
      allowedMentions: { parse: ["everyone"] },
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

export const setTweetCommand = {
  data,
  execute,
};
