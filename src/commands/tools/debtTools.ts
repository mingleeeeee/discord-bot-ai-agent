import { DebtDBDataSource } from "@/sasat/dataSources/db/Debt";

const debtDb = new DebtDBDataSource();

export const getDebtById = async (userId: string) => {
  try {
    const res = await debtDb.findById(
      userId,
      { fields: ["id", "balance", "borrowed"] },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get user debt: ${error}`);
  }
};

export const getUserDebt = async (userId: string) => {
  try {
    const res = await debtDb.findById(
      userId,
      { fields: ["id", "balance", "borrowed"] },
      { lock: "FOR UPDATE" }
    );
    // no debt or balance is 0
    if (!res || res.balance === 0) {
      return 0;
    }
    // has debt
    return res.balance;
  } catch (error) {
    console.error(`Failed to check if user has debt: ${error}`);
  }
};

export const createDebt = async (
  userId: string,
  inputDebt: number,
  inputBorrowed: number
) => {
  try {
    await debtDb.create({
      id: userId,
      balance: inputDebt,
      borrowed: inputBorrowed,
    });
    return true;
  } catch (error) {
    console.error(`Failed to create user debt: ${error}`);
  }
};

export const updateDebt = async (userId: string, inputDebt: number) => {
  try {
    await debtDb.update({ id: userId, balance: inputDebt });
    return true;
  } catch (error) {
    console.error(`Failed to update user debt: ${error}`);
  }
};

export const updateBorrowed = async (userId: string, inputBorrowed: number) => {
  try {
    await debtDb.update({ id: userId, borrowed: inputBorrowed });
    return true;
  } catch (error) {
    console.error(`Failed to update user borrowed: ${error}`);
  }
};
