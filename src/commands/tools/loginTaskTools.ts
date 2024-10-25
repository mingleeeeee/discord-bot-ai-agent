import { LoginTaskDBDataSource } from "@/sasat/dataSources/db/LoginTask";

const loginTaskDb = new LoginTaskDBDataSource();

export const getLoginTask = async () => {
  try {
    const res = await loginTaskDb.find(
      {
        fields: ["taskTypeId", "channelId", "duration", "startAt", "endAt"],
      },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get login task channel id: ${error}`);
  }
};
