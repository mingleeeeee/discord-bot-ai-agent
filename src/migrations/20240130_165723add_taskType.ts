import { SasatMigration, MigrationStore } from "sasat";

const sqls = [
  "INSERT INTO taskType (type, repetitive, reward) VALUES ('login', 1, 100)",
  "INSERT INTO taskType (type, repetitive, reward) VALUES ('discordPost', 0, 100)",
  "INSERT INTO taskType (type, repetitive, reward) VALUES ('xRetweet', 0, 100)",
  "INSERT INTO taskType (type, repetitive, reward) VALUES ('xLike', 0, 100)",
  "INSERT INTO taskType (type, repetitive, reward) VALUES ('rob', 1, 100)",
  "INSERT INTO taskType (type, repetitive, reward) VALUES ('crime', 1, 100)",
];

export default class Add_taskType implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.sql(...sqls);
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on add_taskType");
  };
}
