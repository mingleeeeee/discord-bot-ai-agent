import { DiscordPostTaskDBDataSource } from "@/sasat/dataSources/db/DiscordPostTask";
import { QExpr } from "sasat";

const discordPostTaskDb = new DiscordPostTaskDBDataSource();

export const getPostTask = async (stamp: string, channelId: string) => {
  try {
    const res = await discordPostTaskDb.find(
      {
        fields: ["id", "taskTypeId", "channelId", "includedString"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.and(
          QExpr.conditions.eq(
            QExpr.field("t0", "includedString"),
            QExpr.value(stamp)
          ),
          QExpr.conditions.eq(
            QExpr.field("t0", "channelId"),
            QExpr.value(channelId)
          )
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get post task channel id: ${error}`);
  }
};

export const getPostTaskAll = async () => {
  try {
    const res = await discordPostTaskDb.find(
      {
        fields: ["id", "taskTypeId", "channelId", "includedString"],
      },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get post task: ${error}`);
  }
};
