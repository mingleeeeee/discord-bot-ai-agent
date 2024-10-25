import { SasatMigration, MigrationStore } from "sasat";

export default class Season implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("season", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.column("name").varchar(255);
      table.column("startBalance").int().unsigned();
      table.column("nextStartBalance").int().unsigned();
      table.column("duration").varchar(255);
      table.column("startAt").varchar(255);
      table.column("endAt").varchar(255);
      table.column("status").varchar(255);
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on season");
  };
}
