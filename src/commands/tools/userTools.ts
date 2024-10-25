import { UserDBDataSource } from "@/sasat/dataSources/db/User";

const userDb = new UserDBDataSource();

export const createUser = async (userId: string) => {
  try {
    await userDb.create({ id: userId });
    return true;
  } catch (error) {
    console.error(`Failed to create user: ${error}`);
  }
};

export const checkUser = async (userId: string) => {
  try {
    const res = await userDb.findById(
      userId,
      { fields: ["id"] },
      { lock: "FOR UPDATE" }
    );
    return res ? true : false;
  } catch (error) {
    console.error(`Failed to check user: ${error}`);
  }
};

export const getAllUserId = async () => {
  try {
    const res = await userDb.find(
      {
        fields: ["id"],
      },
      {
        lock: "FOR UPDATE",
      }
    );

    const userIds = res.map((user) => user.id);
    return userIds;
  } catch (error) {
    console.error(`Failed to get all user: ${error}`);
  }
};
