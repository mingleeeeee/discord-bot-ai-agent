import { SasatMigration, MigrationStore } from "sasat";

export default class ChannelMessage implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("channelMessage", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();
      table.references({
        parentTable: "user",
        parentColumn: "id",
        parentFieldName: "channelMessage",
        columnName: "userId",
        relation: "Many",
      });
      table.references({
        parentTable: "channel",
        parentColumn: "channelId",
        parentFieldName: "channelMessage",
        columnName: "channelId",
        relation: "Many",
      });
      table.column("lastMessageTime").varchar(255);
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on channelMessage");
  };
}
