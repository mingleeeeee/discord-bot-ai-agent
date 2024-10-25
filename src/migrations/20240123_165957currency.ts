import { SasatMigration, MigrationStore } from "sasat";

export default class Currency implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("currency", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();
      table.column("symbol").varchar(255);
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on currency");
  };
}
