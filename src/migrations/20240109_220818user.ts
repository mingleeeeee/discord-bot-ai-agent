import { SasatMigration, MigrationStore } from "sasat";

export default class User implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("user", (table) => {
      table.column("id").varchar(255).primary();
      table.createdAt();
    });

    store.createTable("balance", (table) => {
      table
        .references({
          parentTable: "user",
          parentColumn: "id",
          parentFieldName: "balance",
          columnName: "id",
          relation: "OneOrZero",
        })
        .primary();
      table.column("balance").int().unsigned();
      table.updatedAt();
    });

    store.createTable("debt", (table) => {
      table
        .references({
          parentTable: "user",
          parentColumn: "id",
          parentFieldName: "debt",
          columnName: "id",
          relation: "OneOrZero",
        })
        .primary();
      table.column("balance").int().unsigned();
      table.updatedAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on user");
  };
}
