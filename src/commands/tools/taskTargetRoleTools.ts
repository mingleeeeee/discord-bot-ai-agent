import { TaskTargetRoleDBDataSource } from "@/sasat/dataSources/db/TaskTargetRole";
import { QExpr } from "sasat";

const taskTargetRoleDb = new TaskTargetRoleDBDataSource();

export const checkTaskTargetRole = async (
  taskTypeId: number,
  roleName: string
) => {
  try {
    const getTaskTargetRole = await taskTargetRoleDb.find(
      {
        fields: ["id", "taskTypeId", "role"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.and(
          QExpr.conditions.eq(
            QExpr.field("t0", "taskTypeId"),
            QExpr.value(taskTypeId)
          ),
          QExpr.conditions.eq(QExpr.field("t0", "role"), QExpr.value(roleName))
        ),
      }
    );

    // Return true if the task target role is in the table, otherwise return false
    return getTaskTargetRole.length > 0;
  } catch (error) {
    console.error(`Failed to check task target role: ${error}`);
  }
};

export const getTaskTargetRole = async (taskTypeId: number) => {
  try {
    const res = await taskTargetRoleDb.find(
      {
        fields: ["id", "role"],
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
    console.error(`Failed to get task target role: ${error}`);
  }
};

export const createTaskTargetRole = async (
  taskTypeId: number,
  roleName: string
) => {
  try {
    await taskTargetRoleDb.create({
      taskTypeId: taskTypeId,
      role: roleName,
    });
    return true;
  } catch (error) {
    console.error(`Failed to create task target role: ${error}`);
  }
};

export const removeTaskTargetRole = async (
  taskTypeId: number,
  roleName: string
) => {
  try {
    const getTaskTargetRoleId = await taskTargetRoleDb.find(
      {
        fields: ["id"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.and(
          QExpr.conditions.eq(
            QExpr.field("t0", "taskTypeId"),
            QExpr.value(taskTypeId)
          ),
          QExpr.conditions.eq(QExpr.field("t0", "role"), QExpr.value(roleName))
        ),
      }
    );

    await taskTargetRoleDb.delete({
      id: getTaskTargetRoleId[0].id,
    });
    return true;
  } catch (error) {
    console.error(`Failed to remove task target role: ${error}`);
  }
};
