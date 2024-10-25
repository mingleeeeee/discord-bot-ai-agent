import { SasatMigration, MigrationStore } from "sasat";

export default class SeasonStopReservation implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("seasonStopReservation", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.column("stopAt").varchar(255);
      table.updatedAt();
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on seasonStopReservation");
  };
}
