import { BalanceDBDataSource } from "@/sasat/dataSources/db/Balance";
import { getDbClient } from "sasat";

const balanceDb = new BalanceDBDataSource();
const db = getDbClient();

export const getBalanceById = async (userId: string) => {
  try {
    const res = await balanceDb.findById(
      userId,
      { fields: ["id", "balance"] },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get user balance: ${error}`);
  }
};

export const getUserBalance = async (userId: string) => {
  try {
    const res = await balanceDb.findById(
      userId,
      { fields: ["balance"] },
      { lock: "FOR UPDATE" }
    );
    // no balance or balance is 0
    if (!res || res.balance === 0) {
      return 0;
    }
    // has balance
    return res.balance;
  } catch (error) {
    console.error(`Failed to check if user has debt: ${error}`);
  }
};

export const createUserBalance = async (
  userId: string,
  inputBalance: number
) => {
  try {
    await balanceDb.create({ id: userId, balance: inputBalance });
    return true;
  } catch (error) {
    console.error(`Failed to create user balance: ${error}`);
  }
};

export const getAllUserBalanceCount = async () => {
  try {
    const total = db.query`SELECT COUNT(*) FROM balance FOR UPDATE`;
    return total;
  } catch (error) {
    console.error(`Failed to get all user count: ${error}`);
  }
};

export const getUserWithOffset = async (offset: number, limit: number) => {
  try {
    const res = db.query`SELECT * FROM balance LIMIT ${limit} OFFSET ${offset} FOR UPDATE`;
    return res;
  } catch (error) {
    console.error(`Failed to get user with offset: ${error}`);
  }
};

export const updateBalance = async (userId: string, newBalance: number) => {
  try {
    await balanceDb.update({ id: userId, balance: newBalance });
    return true;
  } catch (error) {
    console.error(`Failed to update user balance: ${error}`);
  }
};
