import { BalanceDBDataSource } from "@/sasat/dataSources/db/Balance";
import { UserDBDataSource } from "@/sasat/dataSources/db/User";
// import { updateDebt } from "./debtTools";
import { DebtDBDataSource } from "@/sasat/dataSources/db/Debt";

const userDb = new UserDBDataSource();
const balanceDb = new BalanceDBDataSource();
const debtDb = new DebtDBDataSource();

export const updateMoney = async (userId: string, addValue: number) => {
  try {
    const getUserById = await userDb.findById(
      userId,
      { fields: ["id"] },
      { lock: "FOR UPDATE" }
    );
    // if there is no user's data, create it and create balance
    if (!getUserById) {
      await userDb.create({ id: userId });
    }

    // get user's balance
    const getBalanceById = await balanceDb.findById(
      userId,
      { fields: ["id"] },
      { lock: "FOR UPDATE" }
    );

    // if there is no user's balance will return null, create it with 0
    if (!getBalanceById) {
      await balanceDb.create({
        id: userId,
        balance: 0,
      });
    }

    // get user's debt
    const getDebtById = await debtDb.findById(
      userId,
      { fields: ["id"] },
      { lock: "FOR UPDATE" }
    );

    // if there is no user's debt, create it with 0
    if (!getDebtById) {
      await debtDb.create({ id: userId, balance: 0, borrowed: 0 });
    }

    // once the new balance is less than 0, set balance as 0
    const userBalanceById = await balanceDb.findById(
      userId,
      { fields: ["id", "balance"] },
      { lock: "FOR UPDATE" }
    );
    const userBalance = Number(userBalanceById?.balance);
    const newBalance = userBalance + addValue;

    // if newBalance is less than 0, update the balance to 0
    if (newBalance < 0) {
      await balanceDb.update({ id: userId, balance: 0 });
      return;
    }
    // if newBalance is 0, update the debt and balance to 0,
    if (newBalance === 0) {
      await balanceDb.update({ id: userId, balance: 0 });
      return;
    }
    // if newBalance is more than 0, update the balance, update the debt to 0
    if (newBalance > 0) {
      await balanceDb.update({ id: userId, balance: newBalance });
      return;
    }

    return;
  } catch (error) {
    console.error(`Error updating money for user ${userId}:`, error);
    throw error; // re-throw the error so it can be handled by the caller
  }
};
