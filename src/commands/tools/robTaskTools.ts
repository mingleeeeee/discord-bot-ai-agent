import { RobTaskDBDataSource } from "@/sasat/dataSources/db/RobTask";

const robTaskDb = new RobTaskDBDataSource();

export const getRobTask = async () => {
  try {
    const res = await robTaskDb.find(
      {
        fields: [
          "id",
          "taskTypeId",
          "duration",
          "penalty",
          "winRate",
          "stolenRole",
        ],
      },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get rob task channel id: ${error}`);
  }
};
