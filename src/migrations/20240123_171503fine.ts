import { SasatMigration, MigrationStore } from "sasat";

export default class Fine implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("fineAmount", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();
      table.column("extremum").varchar(255);
      table.column("amount").int().unsigned();
      table.createdAt();
    });

    store.createTable("fineType", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();
      table.column("type").varchar(255);
      table.column("status").varchar(255);
      table.createdAt();
    });

    store.createTable("failPercentage", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();
      table.column("crimeType").varchar(255);
      table.column("percentage").int().unsigned();
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on fine");
  };
}
