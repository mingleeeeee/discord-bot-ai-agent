import { SasatMigration, MigrationStore } from "sasat";

export default class ReplyTweetUser implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("replyTweetUser", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();

      table.references({
        parentTable: "tweet",
        parentColumn: "tweetId",
        parentFieldName: "replyTweetUser",
        columnName: "tweetId",
        relation: "Many",
      });

      table.references({
        parentTable: "user",
        parentColumn: "id",
        parentFieldName: "replyTweetUser",
        columnName: "userId",
        relation: "Many",
      });

      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on replyTweetUser");
  };
}
