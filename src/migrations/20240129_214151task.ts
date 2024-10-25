import { SasatMigration, MigrationStore } from "sasat";

export default class Task implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("taskType", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.column("type").varchar(255); //login, discordPost, xRetweet, xLike, rob, crime etc
      table.column("repetitive").int().unsigned(); //0 or 1
      table.column("reward").int().unsigned();
      table.createdAt();
    });

    store.createTable("loginTask", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "loginTask",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("duration").varchar(255); // 1Day
      table.column("startAt").varchar(255);
      table.column("endAt").varchar(255);
      table.column("channelId").varchar(255);
    });

    store.createTable("discordPostTask", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "discordPostTask",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("includedString").varchar(255);
      table.column("channelId").varchar(255);
    });

    store.createTable("xRetweetTask", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "xRetweetTask",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("tweetId").varchar(255);
      table.column("deadline").varchar(255);
    });

    store.createTable("xLikeTask", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "xLikeTask",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("tweetId").varchar(255);
      table.column("deadline").varchar(255);
    });

    store.createTable("robTask", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "robTask",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("duration").varchar(255);
      table.column("penalty").int().unsigned();
      table.column("winRate").int().unsigned();
    });

    store.createTable("crimeTask", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "crimeTask",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("duration").varchar(255);
      table.column("penalty").int().unsigned();
      table.column("winRate").int().unsigned();
    });

    store.createTable("completedTaskUser", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "completedTaskUser",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("completedTaskId").int().unsigned();
      table.references({
        parentTable: "user",
        parentColumn: "id",
        parentFieldName: "completedTaskUser",
        columnName: "userId",
        relation: "Many",
      });
      table.column("completedAt").varchar(255);
    });

    store.createTable("taskTargetRole", (table) => {
      table.column("id").int().unsigned().autoIncrement().primary();
      table.references({
        parentTable: "taskType",
        parentColumn: "id",
        parentFieldName: "taskTargetRole",
        columnName: "taskTypeId",
        relation: "Many",
      });
      table.column("role").varchar(255);
    });
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on task");
  };
}
