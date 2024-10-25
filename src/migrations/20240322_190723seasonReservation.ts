import { SasatMigration, MigrationStore } from "sasat";

export default class SeasonReservation implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("seasonReservation", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.column("startAt").varchar(255);
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on seasonReservation");
  };
}
