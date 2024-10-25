import { SasatMigration, MigrationStore } from "sasat";

export default class Bonus implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("bonus", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "bonus",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("bonusTaskId").int().unsigned();
      table.column("amount").int().unsigned();
      table.column("startAt").varchar(255);
      table.column("endAt").varchar(255);
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on bonus");
  };
}
