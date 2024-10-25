import { BonusDBDataSource } from "@/sasat/dataSources/db/Bonus";
import { QExpr } from "sasat";

const bonusDb = new BonusDBDataSource();

export const getBonus = async (taskTypeId: number, bonusTaskId: number) => {
  try {
    const res = await bonusDb.find(
      {
        fields: ["id", "amount", "startAt", "endAt"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.and(
          QExpr.conditions.eq(
            QExpr.field("t0", "taskTypeId"),
            QExpr.value(taskTypeId)
          ),
          QExpr.conditions.eq(
            QExpr.field("t0", "bonusTaskId"),
            QExpr.value(bonusTaskId)
          )
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get bonus: ${error}`);
  }
};

export const getBonusByTaskType = async (taskTypeId: number) => {
  try {
    const res = await bonusDb.find(
      {
        fields: ["id", "amount", "startAt", "endAt"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "taskTypeId"),
          QExpr.value(taskTypeId)
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get bonus by task type: ${error}`);
  }
};

export const finalBonusAmount = async (
  taskTypeId: number,
  bonusTaskId: number
) => {
  try {
    const getBonusData = (await getBonus(taskTypeId, bonusTaskId)) || [];

    if (!getBonusData.length) {
      return 0;
    }
    const { amount, startAt, endAt } = getBonusData[0];

    if (Number(startAt) > Date.now()) {
      return 0;
    }
    if (Number(endAt) < Date.now()) {
      return 0;
    }
    return amount;
  } catch (error) {
    console.error(`Failed to get final bonus: ${error}`);
  }
};
