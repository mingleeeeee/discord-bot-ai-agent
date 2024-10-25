import { SasatMigration, MigrationStore } from "sasat";

export default class Game implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("game", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();
      table.column("name").varchar(255);
      table.createdAt();
    });

    store.createTable("betLimit", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();
      table.references({
        parentTable: "game",
        parentColumn: "id",
        parentFieldName: "betLimit",
        columnName: "gameId",
        relation: "Many",
      });

      table.column("extremum").varchar(255);
      table.column("amount").int().unsigned();
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on game");
  };
}
