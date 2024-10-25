import { CompletedTaskUserDBDataSource } from "@/sasat/dataSources/db/CompletedTaskUser";
import { QExpr } from "sasat";

const completedTaskUserDb = new CompletedTaskUserDBDataSource();

export const checkCompletedTask = async (
  taskTypeId: number,
  completedTaskId: number,
  userId: string
) => {
  try {
    const res = await completedTaskUserDb.find(
      {
        fields: [
          "id",
          "taskTypeId",
          "completedTaskId",
          "userId",
          "completedAt",
        ],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.and(
          QExpr.conditions.and(
            QExpr.conditions.eq(
              QExpr.field("t0", "taskTypeId"),
              QExpr.value(taskTypeId)
            ),
            QExpr.conditions.eq(
              QExpr.field("t0", "completedTaskId"),
              QExpr.value(completedTaskId)
            )
          ),
          QExpr.conditions.eq(QExpr.field("t0", "userId"), QExpr.value(userId))
        ),
      }
    );
    return res.length > 0;
  } catch (error) {
    console.error(`Failed to get completed task: ${error}`);
  }
};

export const getCompletedTask = async (
  taskTypeId: number,
  completedTaskId: number,
  userId: string
) => {
  try {
    const res = await completedTaskUserDb.find(
      {
        fields: [
          "id",
          "taskTypeId",
          "completedTaskId",
          "userId",
          "completedAt",
        ],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.and(
          QExpr.conditions.and(
            QExpr.conditions.eq(
              QExpr.field("t0", "taskTypeId"),
              QExpr.value(taskTypeId)
            ),
            QExpr.conditions.eq(
              QExpr.field("t0", "completedTaskId"),
              QExpr.value(completedTaskId)
            )
          ),
          QExpr.conditions.eq(QExpr.field("t0", "userId"), QExpr.value(userId))
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get completed task: ${error}`);
  }
};

export const createCompletedTask = async (
  taskTypeId: number,
  completedTaskId: number,
  userId: string
) => {
  try {
    await completedTaskUserDb.create({
      taskTypeId: taskTypeId,
      completedTaskId: completedTaskId,
      userId: userId,
      completedAt: Date.now().toString(),
    });
    return true;
  } catch (error) {
    console.error(`Failed to create completed task: ${error}`);
  }
};

export const updateCompletedTask = async (
  id: number,
  completedTask: Partial<{
    taskTypeId: number;
    completedTaskId: number;
    userId: string;
    completedAt: string;
  }>
) => {
  try {
    const updateParams = {
      id: id,
      ...completedTask,
    };
    await completedTaskUserDb.update(updateParams);
    return true;
  } catch (error) {
    console.error(`Failed to update completed task: ${error}`);
  }
};
