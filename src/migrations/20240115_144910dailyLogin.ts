import { SasatMigration, MigrationStore } from "sasat";

export default class DailyLogin implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("dailyLogin", (table) => {
      table
        .references({
          parentTable: "user",
          parentColumn: "id",
          parentFieldName: "dailyLogin",
          columnName: "id",
          relation: "OneOrZero",
        })
        .primary();
      table.column("last_login").varchar(255);
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on dailyLogin");
  };
}
