import { SeasonDBDataSource } from "@/sasat/dataSources/db/Season";
import { Client } from "discord.js";
import { QExpr } from "sasat";
import { getUserBalance, updateBalance } from "./balanceTools";
import { getUserDebt, updateBorrowed, updateDebt } from "./debtTools";
import { getAllItem, updateItem } from "./itemTools";
import { snapshot } from "./statsTools";
import { resetItemBalanceByItemId } from "./itemBalanceTools";

const seasonDB = new SeasonDBDataSource();

export const getLatestSeason = async () => {
  try {
    const res = await seasonDB.find(
      {
        fields: [
          "id",
          "name",
          "startBalance",
          "nextStartBalance",
          "duration",
          "startAt",
          "endAt",
          "status",
        ],
      },
      {
        sort: [QExpr.sort(QExpr.field("t0", "id"), "DESC")],
        limit: 1,
        lock: "FOR UPDATE",
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const createSeason = async (
  name: string,
  startBalance: number,
  nextStartBalance: number,
  durationMs: string
) => {
  try {
    const now = Date.now();
    const endtime = now + Number(durationMs);
    const res = await seasonDB.create({
      name: name,
      startBalance: startBalance,
      nextStartBalance: nextStartBalance,
      duration: durationMs,
      startAt: now.toString(),
      endAt: endtime.toString(),
      status: "active",
    });
    return res;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const updateNextStartBalance = async (nextStartBalance: number) => {
  try {
    const getCurrentSeasonRes = (await getLatestSeason()) || [];
    const currentSeasonId = getCurrentSeasonRes[0].id;
    await seasonDB.update({
      id: currentSeasonId,
      nextStartBalance: nextStartBalance,
    });
    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const createNextSeason = async () => {
  try {
    // for testing
    // const test1min = 1000 * 60;
    // const test5min = 1000 * 60 * 5;
    // const test30min = 1000 * 60 * 30;
    const fourteenDays = 1000 * 60 * 60 * 24 * 14;
    const getCurrentSeasonRes = (await getLatestSeason()) || [];

    if (!getCurrentSeasonRes.length) {
      await createSeason(`Season-1`, 0, 0, fourteenDays.toString());
      return true;
    }
    const currentSeason = getCurrentSeasonRes[0];
    const nextStartBalance = Number(currentSeason.nextStartBalance);

    const nextSeasonName = `Season-${
      Number(currentSeason.name?.split("-")[1]) + 1
    }`;
    await createSeason(
      nextSeasonName,
      nextStartBalance,
      // following season start balance is the same as the current season's next start balance
      nextStartBalance,
      fourteenDays.toString()
    );
    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};

/** reset the season status and user status to ended
- 1. reset the all old labor's balance and debt
- 2. remove all old labor's role
- 3. check all user's debt and balance, if debt - balance >0, change role to labor
- 4. reset the item.balance and item.maxiumPerPesron
- 4.5. reset the user item balance (if true)
- 5. reset all user balance and debt (or set to the start-balance)
- 6. reset the season status to ended 
*/
export const endSeasonSettlement = async (client: Client) => {
  try {
    // 1. reset the all old labor's balance and debt
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) return console.log("Guild not found");

    // get the snapshot of the current season
    await snapshot(guild);

    await guild.members.fetch();
    // get the labor role
    const role = guild.roles.cache.find(
      (r) => r.name === process.env.DISCORD_ROLE_NAME_LABOR
    );
    if (!role) return console.log("Role not found");
    // get all members with the role labor
    const laborUserIds =
      guild?.roles.cache.get(role.id || "")?.members.map((m) => m.user.id) ||
      [];

    // reset the all old labor's balance and debt
    await Promise.all(laborUserIds.map((userId) => updateBalance(userId, 0)));
    await Promise.all(laborUserIds.map((userId) => updateDebt(userId, 0)));

    // 2. remove all old labor's role
    await Promise.all(
      laborUserIds.map((userId) => {
        const member = guild.members.cache.get(userId);
        if (!member) return;
        member.roles.remove(role);
      })
    );

    const allMembers = guild.members.cache;
    // 3. check all user's debt and balance, if debt -balance >0, change role to labor
    allMembers.forEach(async (member) => {
      const userId = member.user.id;
      const userBalance = Number(await getUserBalance(userId));
      const userDebt = Number(await getUserDebt(userId));
      if (userDebt - userBalance > 0) {
        member.roles.add(role);
      }
    });

    // 4. reset the item.balance and item.maxiumPerPesron
    const getAllItemRes = (await getAllItem()) || [];
    const allItemIds = getAllItemRes.map((i) => i.id);
    await Promise.all(
      allItemIds.map((itemId) => {
        updateItem(itemId, {
          balance: 0,
          maxiumPerPesron: 0,
        });
      })
    );

    // 4.5. reset the user item balance (if true)
    const allResetItemIds = getAllItemRes
      .filter((i) => i.reset === "true")
      .map((i) => i.id);

    // update user item balance to 0
    await Promise.all(
      allResetItemIds.map((itemId) => {
        resetItemBalanceByItemId(itemId);
      })
    );

    // 5. reset all user balance and debt (set balance to the start-balance)
    const getCurrentSeasonRes = (await getLatestSeason()) || [];
    const allMembersIds = allMembers.map((m) => m.user.id);
    // if there is no season, means it is first season, reset all user's balance and debt to 0
    if (!getCurrentSeasonRes.length) {
      await Promise.all(
        allMembersIds.map((userId) => updateBalance(userId, 0))
      );
      await Promise.all(allMembersIds.map((userId) => updateDebt(userId, 0)));
      await Promise.all(
        allMembersIds.map((userId) => updateBorrowed(userId, 0))
      );
    } else {
      // if there is a season, reset all user's balance to the start-balance
      const currentSeason = getCurrentSeasonRes[0];
      const nextStartBalance = Number(currentSeason.nextStartBalance);
      await Promise.all(
        allMembersIds.map((userId) => updateBalance(userId, nextStartBalance))
      );
      await Promise.all(allMembersIds.map((userId) => updateDebt(userId, 0)));
      await Promise.all(
        allMembersIds.map((userId) => updateBorrowed(userId, 0))
      );
      // 6. if there is a season, set current season status to ended
      const currentSeasonId = getCurrentSeasonRes[0].id;
      await seasonDB.update({
        id: currentSeasonId,
        status: "ended",
      });

      return true;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export const updateCurrentSeasonEndAt = async (newEndDateMs: string) => {
  try {
    const getCurrentSeasonRes = (await getLatestSeason()) || [];
    const currentSeasonId = getCurrentSeasonRes[0].id;
    await seasonDB.update({
      id: currentSeasonId,
      endAt: newEndDateMs,
    });
    return true;
  } catch (error) {
    console.error(error);
    return;
  }
};
