import { SasatMigration, MigrationStore } from "sasat";

export default class Channel implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("channel", (table) => {
      table.column("channelId").varchar(255).primary();
      table.column("amount").int().unsigned(); // the bonus amount
      table.column("cooldown").int().unsigned(); // the cooldown time
      table.column("status").varchar(255); // the status of the channel
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on channel");
  };
}
