import { SasatMigration, MigrationStore } from "sasat";

export default class Drop_unused_table implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.dropTable("betLimit");
    store.dropTable("channelMessage");
    store.dropTable("dailyLogin");
    store.dropTable("expireTweet");
    store.dropTable("failPercentage");
    store.dropTable("fineAmount");
    store.dropTable("fineType");
    store.dropTable("likeTweetUser");
    store.dropTable("replyTweetUser");
    store.dropTable("retweetUser");
    store.dropTable("channel");
    store.dropTable("game");
    store.dropTable("tweet");
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on drop_unused_table");
  };
}
