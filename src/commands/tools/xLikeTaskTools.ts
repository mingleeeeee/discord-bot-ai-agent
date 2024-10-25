import { XLikeTaskDBDataSource } from "@/sasat/dataSources/db/XLikeTask";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ChannelType,
  ChatInputCommandInteraction,
} from "discord.js";
import { TimeComponents } from "parse-ms";
import { QExpr } from "sasat";

const xLikeTaskDb = new XLikeTaskDBDataSource();

export const checkXLikeTaskByTweetId = async (tweetId: string) => {
  try {
    const res = await xLikeTaskDb.find(
      {
        fields: ["id", "tweetId"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "tweetId"),
          QExpr.value(tweetId)
        ),
      }
    );

    // Return true if the xLikeTask is in the table, otherwise return false
    return res.length > 0;
  } catch (error) {
    console.error(`Failed to check xLikeTask: ${error}`);
  }
};

export const getXLikeTaskByTweetId = async (tweetId: string) => {
  try {
    const res = await xLikeTaskDb.find(
      {
        fields: ["id"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "tweetId"),
          QExpr.value(tweetId)
        ),
      }
    );

    return res;
  } catch (error) {
    console.error(`Failed to get xLikeTask: ${error}`);
  }
};

export const getXLikeTaskDeadline = async (tweetId: string) => {
  try {
    const res = await xLikeTaskDb.find(
      {
        fields: ["id", "deadline"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "tweetId"),
          QExpr.value(tweetId)
        ),
      }
    );

    if (res.length > 0) {
      return Number(res[0].deadline || 0);
    } else {
      console.error(`No xLikeTask found with tweetId: ${tweetId}`);
      return 0;
    }
  } catch (error) {
    console.error(`Failed to get xLikeTaskDeadline: ${error}`);
  }
};

export const createXLikeTaskAndPost = async (
  tweetId: string,
  deadlineMs: number,
  interaction: ChatInputCommandInteraction<CacheType>,
  countDown: TimeComponents<number>,
  originalUrl: string
) => {
  try {
    await xLikeTaskDb
      .create({
        taskTypeId: 4,
        tweetId: tweetId,
        deadline: deadlineMs.toString(),
      })
      .then(async (res) => {
        // Get a reference to the client
        const client = interaction.client;

        // hardcoded the channel id
        const xTaskChannelId = process.env.DISCORD_CHANNEL_ID_X_LIKE_TASK || "";

        // Get a reference to the channel
        const channel = client.channels.cache.get(xTaskChannelId);
        const tweeter = new ButtonBuilder()
          // set button customId as tweetId
          .setCustomId(res.tweetId)
          .setLabel("X")
          .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          tweeter
        );

        if (channel?.type === ChannelType.GuildText) {
          channel.send({
            content: `\nTweet: ${originalUrl} \nEngage X Task To Get Your Point \nEnds: ${countDown.days} days ${countDown.hours} hours ${countDown.minutes} minutes ${countDown.seconds} seconds \n@everyone`,
            components: [row],
            allowedMentions: { parse: ["everyone"] },
          });
          // console.log("res:", res);
        }
        return res;
      });
  } catch (error) {
    console.error(`Failed to create xLikeTask: ${error}`);
  }
};

export const getXLikeTaskAll = async () => {
  try {
    const res = await xLikeTaskDb.find(
      {
        fields: ["id", "taskTypeId", "tweetId", "deadline"],
      },
      { lock: "FOR UPDATE" }
    );

    return res;
  } catch (error) {
    console.error(`Failed to get xLikeTask: ${error}`);
  }
};
