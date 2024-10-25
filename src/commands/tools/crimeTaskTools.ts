import { CrimeTaskDBDataSource } from "@/sasat/dataSources/db/CrimeTask";

const crimeTaskDb = new CrimeTaskDBDataSource();

export const getCrimeTask = async () => {
  try {
    const res = await crimeTaskDb.find(
      {
        fields: ["id", "taskTypeId", "duration", "penalty", "winRate"],
      },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get crime task: ${error}`);
  }
};
