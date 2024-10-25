import { SasatMigration, MigrationStore } from "sasat";

export default class Tweet implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("tweet", (table) => {
      table.column("tweetId").varchar(255).primary();
      table.createdAt();
    });

    store.createTable("expireTweet", (table) => {
      table
        .references({
          parentTable: "tweet",
          parentColumn: "tweetId",
          parentFieldName: "expireTweet",
          columnName: "tweetId",
          relation: "OneOrZero",
        })
        .primary();
      table.column("expireAt").varchar(255);
      table.createdAt();
    });

    store.createTable("retweetUser", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();

      table.references({
        parentTable: "tweet",
        parentColumn: "tweetId",
        parentFieldName: "retweetUser",
        columnName: "tweetId",
        relation: "Many",
      });

      table.references({
        parentTable: "user",
        parentColumn: "id",
        parentFieldName: "retweetUser",
        columnName: "userId",
        relation: "Many",
      });

      table.createdAt();
    });

    store.createTable("likeTweetUser", (table) => {
      table.column("id").int().autoIncrement().unsigned().primary();

      table.references({
        parentTable: "tweet",
        parentColumn: "tweetId",
        parentFieldName: "likeTweetUser",
        columnName: "tweetId",
        relation: "Many",
      });

      table.references({
        parentTable: "user",
        parentColumn: "id",
        parentFieldName: "likeTweetUser",
        columnName: "userId",
        relation: "Many",
      });

      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on tweet");
  };
}
