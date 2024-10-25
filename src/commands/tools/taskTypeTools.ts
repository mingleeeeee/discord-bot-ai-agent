import { TaskTypeDBDataSource } from "@/sasat/dataSources/db/TaskType";
import { QExpr } from "sasat";

const taskTypeDb = new TaskTypeDBDataSource();

// check if the task type is in the task type table
export const checkTaskType = async (taskType: string) => {
  try {
    const getTaskTypeByType = await taskTypeDb.find(
      {
        fields: ["id", "type"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "type"),
          QExpr.value(taskType)
        ),
      }
    );

    // if the task type is in the task type table, return true
    return getTaskTypeByType.length > 0;
  } catch (error) {
    console.error(`Failed to check task type: ${error}`);
  }
};

export const getTaskTypeAll = async () => {
  try {
    const res = await taskTypeDb.find(
      {
        fields: ["id", "type", "repetitive", "reward"],
      },
      { lock: "FOR UPDATE" }
    );

    return res;
  } catch (error) {
    console.error(`Failed to get task type: ${error}`);
  }
};

export const getTaskTypeByType = async (taskType: string) => {
  try {
    const getTaskTypeByType = await taskTypeDb.find(
      {
        fields: ["id", "type", "repetitive", "reward"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "type"),
          QExpr.value(taskType)
        ),
      }
    );

    // if the task type is in the task type table, return true
    return getTaskTypeByType;
  } catch (error) {
    console.error(`Failed to check task type: ${error}`);
  }
};

export const createTaskType = async (
  taskType: string,
  repetitive: number,
  reward: number
) => {
  try {
    await taskTypeDb.create({
      type: taskType,
      repetitive: repetitive,
      reward: reward,
    });
    return true;
  } catch (error) {
    console.error(`Failed to create task type: ${error}`);
  }
};

export const getTaskTypeById = async (taskTypeId: number) => {
  try {
    const res = await taskTypeDb.findById(
      taskTypeId,
      { fields: ["id", "type", "repetitive", "reward"] },
      { lock: "FOR UPDATE" }
    );

    return res;
  } catch (error) {
    console.error(`Failed to get task type: ${error}`);
  }
};
