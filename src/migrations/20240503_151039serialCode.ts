import { SasatMigration, MigrationStore } from "sasat";

export default class SerialCode implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("serialCode", (table) => {
      table.column("id").varchar(255).primary();
      table.column("code").varchar(255);
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on serialCode");
  };
}
