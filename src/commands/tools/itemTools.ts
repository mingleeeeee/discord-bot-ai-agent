import { ItemDBDataSource } from "@/sasat/dataSources/db/Item";
import { QExpr } from "sasat";

const itemDb = new ItemDBDataSource();

export const checkItemByName = async (itemName: string) => {
  try {
    const res = await itemDb.find(
      {
        fields: ["id"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "name"),
          QExpr.value(itemName)
        ),
      }
    );

    // Return true if the item is in the table, otherwise return false
    return res.length > 0;
  } catch (error) {
    console.error(`Failed to check item: ${error}`);
  }
};

export const getItemByName = async (itemName: string) => {
  try {
    const res = await itemDb.find(
      {
        fields: ["id", "name", "balance", "price", "status", "maxiumPerPesron"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "name"),
          QExpr.value(itemName)
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get item: ${error}`);
  }
};

export const createItem = async (
  name: string,
  description: string,
  image: string,
  price: number,
  balance: number,
  maxiumPerPesron: number,
  status: string,
  reset: string
) => {
  try {
    await itemDb.create({
      name: name,
      description: description,
      image: image,
      price: price,
      balance: balance,
      maxiumPerPesron: maxiumPerPesron,
      status: status,
      reset: reset,
    });
    return true;
  } catch (error) {
    console.error(`Failed to create item: ${error}`);
  }
};

export const updateItem = async (
  id: number,
  item: Partial<{
    name: string;
    description: string;
    image: string;
    price: number;
    balance: number;
    maxiumPerPesron: number;
    status: string;
    reset: string;
  }>
) => {
  try {
    const updateParams = {
      id: id,
      ...item,
    };

    // console.log("updateParams:", updateParams);

    await itemDb.update(updateParams);
    return true;
  } catch (error) {
    console.error(`Failed to update item: ${error}`);
  }
};

export const getNotDeletedItem = async () => {
  try {
    const res = await itemDb.find(
      {
        fields: ["name", "balance", "price", "maxiumPerPesron", "description"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.neq(
          QExpr.field("t0", "status"),
          QExpr.value("deleted")
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get item by status: ${error}`);
  }
};

export const getListedItem = async () => {
  try {
    const res = await itemDb.find(
      {
        fields: ["name", "balance", "price", "maxiumPerPesron", "description"],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.eq(
          QExpr.field("t0", "status"),
          QExpr.value("listed")
        ),
      }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get item by status: ${error}`);
  }
};

export const getAllItem = async () => {
  try {
    const res = await itemDb.find(
      {
        fields: [
          "id",
          "name",
          "balance",
          "price",
          "maxiumPerPesron",
          "description",
          "status",
          "reset",
        ],
      },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get all item: ${error}`);
  }
};
