var Drop_unused_table = /** @class */ (function () {
    function Drop_unused_table() {
        this.up = function (store) {
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
        this.down = function () {
            throw new Error("Down is not implemented on drop_unused_table");
        };
    }
    return Drop_unused_table;
}());
export default Drop_unused_table;