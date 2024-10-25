/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerialCodeDBDataSource } from "@/sasat/dataSources/db/SerialCode";
import { QExpr } from "sasat";
// import fs from "fs";
import { AttachmentBuilder } from "discord.js";
const serialCodeDb = new SerialCodeDBDataSource();

export const createSerialCode = async (userId: string, serialCode: string) => {
  try {
    await serialCodeDb.create({ id: userId, code: serialCode });
    return true;
  } catch (error) {
    console.error(`Failed to create serial code: ${error}`);
  }
};

// to check if the user already has a serial code
export const checkSerialCodeUser = async (userId: string) => {
  try {
    const res = await serialCodeDb.findById(
      userId,
      { fields: ["id", "code"] },
      { lock: "FOR UPDATE" }
    );

    if (res?.code) {
      return res.code;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Failed to check serial code: ${error}`);
  }
};

export const getAllSerialCode = async () => {
  try {
    const res = await serialCodeDb.find({ fields: ["id", "code"] });
    return res;
  } catch (error) {
    console.error(`Failed to get all serial code: ${error}`);
  }
};

export const checkSerialCode = async (serialCode: string) => {
  try {
    const res = await serialCodeDb.find(
      { fields: ["code"] },

      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "code"),
          QExpr.value(serialCode)
        ),
      }
    );
    // console.log("serial code res:", res);
    return res.length > 0 ? true : false;
  } catch (error) {
    console.error(`Failed to check serial code: ${error}`);
  }
};

export const sixDigitCodeGen = async () => {
  let serialNumber;
  // Generate a new serial number and store it in the database
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  do {
    //reset the serial number
    serialNumber = "";
    for (let i = 0; i < 6; i++) {
      serialNumber += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  } while (await checkSerialCode(serialNumber));

  return serialNumber;
};

export const toCSV = (data: any[]) => {
  const header = ["id", "code"];
  const rows = data.map((obj) =>
    header.map((fieldName) => JSON.stringify(obj[fieldName] || ""))
  );
  const csvHeader = ["userId", "userSerialCode"];
  const csvString = [csvHeader, ...rows].join("\n");

  // Convert the data to a Buffer
  const buffer = Buffer.from(csvString, "utf-8");
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  // Create a new MessageAttachment
  const attachment = new AttachmentBuilder(buffer, {
    name: `serial_code_${formattedDate}.csv`,
    description: "user serial code",
  });

  return attachment;
};
