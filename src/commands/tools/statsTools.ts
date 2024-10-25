import { AttachmentBuilder, ChannelType, Guild } from "discord.js";
import { getLatestSeason } from "./seasonTools";
import { getAllUserId } from "./userTools";
import { getAllItem } from "./itemTools";
import { getUserBalance } from "./balanceTools";
import { getUserDebt } from "./debtTools";
import { getUserAllBalance } from "./itemBalanceTools";

export const snapshot = async (guild: Guild) => {
  try {
    const csvData = [];
    const userData: {
      [key: string]: string | number | undefined | string[] | object;
    } = {
      "Current season": "",
      DiscordID: "",
      Username: "",
      "Wallet ID": "",
      Role: "",
      "Current points balance": "",
      "Current debt balance": "",
    };

    const currentSeason = (await getLatestSeason()) || [];
    const seasonName = currentSeason[0].name || "";

    const allUserIds = (await getAllUserId()) || [];

    await guild?.members.fetch();

    const allItem = (await getAllItem()) || [];
    for (const item of allItem) {
      userData[`${item.id}_${item.name}_balance`] = 0;
    }

    for (const userId of allUserIds) {
      userData[`Current season`] = seasonName;
      userData[`DiscordID`] = userId;

      // 1. get user roles by userId
      const member = guild?.members.cache.get(userId);
      userData[`Username`] = member?.user.displayName;
      const roles = member?.roles.cache.map((role) => role.name);
      userData[`Role`] = roles?.join("/");
      // 2. get balance and debt by userId
      const userBalance = await getUserBalance(userId);
      userData[`Current points balance`] = userBalance;
      const userDebt = await getUserDebt(userId);
      userData[`Current debt balance`] = userDebt;

      // 3. get all item balance by userId
      const userItemBalanceData = await getUserAllBalance(userId);

      for (const item of allItem) {
        const itemBalance = userItemBalanceData?.find(
          (i) => i.itemId === item.id
        );
        userData[`${item.id}_${item.name}_balance`] = itemBalance?.balance || 0;
      }
      // Get the keys and values from the object
      const keys = Object.keys(userData);
      const values = Object.values(userData);

      // Add the keys as the header row if csvData is empty
      if (csvData.length === 0) {
        csvData.push(keys.join(","));
      }

      // Add the values as a new row
      csvData.push(values.join(","));
    }

    // Convert the array to a string
    const csvString = csvData.join("\n");

    // Get today's date
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    // Convert the data to a Buffer
    const buffer = Buffer.from(csvString, "utf-8");

    // Create a new MessageAttachment
    const attachment = new AttachmentBuilder(buffer, {
      name: `user_stats_${formattedDate}.csv`,
      description: "user stats",
    });

    // hardcoded the channel id
    const snapshotChannelId = process.env.DISCORD_CHANNEL_ID_SNAPSHOT || "";

    // Get a reference to the channel
    const channel = guild.channels.cache.get(snapshotChannelId);

    if (channel?.type === ChannelType.GuildText) {
      channel.send({
        content: `Snapshot of the season: ${seasonName}`,
        files: [attachment],
      });
    }
    return true;
  } catch (error) {
    console.error(`Failed to snapshot: ${error}`);
  }
};
