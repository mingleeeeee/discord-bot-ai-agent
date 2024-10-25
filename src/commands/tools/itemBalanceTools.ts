import { ItemBalanceDBDataSource } from "@/sasat/dataSources/db/ItemBalance";
import { QExpr } from "sasat";

const itemBalanceDb = new ItemBalanceDBDataSource();

export const getUserAllBalance = async (userId: string) => {
  try {
    const res = await itemBalanceDb.find(
      {
        fields: ["id", "itemId", "balance"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "userId"),
          QExpr.value(userId)
        ),
      }
    );

    return res;
  } catch (error) {
    console.error(`Failed to get user balance: ${error}`);
  }
};
export const getUserItemBalance = async (itemId: number, userId: string) => {
  try {
    const res = await itemBalanceDb.find(
      {
        fields: ["id", "balance"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.and(
          QExpr.conditions.eq(QExpr.field("t0", "itemId"), QExpr.value(itemId)),
          QExpr.conditions.eq(QExpr.field("t0", "userId"), QExpr.value(userId))
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get item balance: ${error}`);
  }
};

export const createUserItemBalance = async (
  itemId: number,
  userId: string,
  balance: number
) => {
  try {
    await itemBalanceDb.create({
      itemId: itemId,
      userId: userId,
      balance: balance,
    });
    return true;
  } catch (error) {
    console.error(`Failed to create item balance: ${error}`);
  }
};

export const updateUserItemBalance = async (
  userItemBalanceId: number,
  newUserbalance: number
) => {
  try {
    await itemBalanceDb.update({
      id: userItemBalanceId,
      balance: newUserbalance,
    });
    return true;
  } catch (error) {
    console.error(`Failed to update item balance: ${error}`);
  }
};

export const resetItemBalanceByItemId = async (itemId: number) => {
  try {
    // get itemBalanceId by itemId
    const itemBalanceRes = (await getItemBalanceByItemId(itemId)) || [];

    if (!itemBalanceRes.length) {
      return false;
    }

    const itemBalanceIds = itemBalanceRes.map((item) => item.id);

    await Promise.all(
      itemBalanceIds.map(async (itemBalanceId) => {
        await itemBalanceDb.update({
          id: itemBalanceId,
          balance: 0,
        });
      })
    );

    return true;
  } catch (error) {
    console.error(`Failed to update item balance: ${error}`);
  }
};
export const getItemBalanceByItemId = async (itemId: number) => {
  try {
    const res = await itemBalanceDb.find(
      {
        fields: ["id", "balance", "userId"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "itemId"),
          QExpr.value(itemId)
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get item balance: ${error}`);
  }
};
