import { SasatMigration, MigrationStore } from "sasat";

export default class Item implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("item", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();
      table.column("name").varchar(255);
      table.column("description").varchar(255);
      table.column("status").varchar(255);
      table.createdAt();
    });

    store.createTable("itemBalance", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "item",
        parentColumn: "id",
        parentFieldName: "itemBalance",
        columnName: "itemId",
        relation: "Many",
      });

      table.references({
        parentTable: "user",
        parentColumn: "id",
        parentFieldName: "itemBalance",
        columnName: "userId",
        relation: "Many",
      });

      table.column("balance").int().unsigned();
      table.updatedAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on item");
  };
}
