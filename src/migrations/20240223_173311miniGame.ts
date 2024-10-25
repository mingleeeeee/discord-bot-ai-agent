import { SasatMigration, MigrationStore } from "sasat";

export default class MiniGame implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("miniGame", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.column("name").varchar(255);
      table.column("winRate").int().unsigned();
      table.column("maxDebt").int().unsigned();
      table.column("maxBet").int().unsigned();
      table.column("minBet").int().unsigned();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on miniGame");
  };
}
