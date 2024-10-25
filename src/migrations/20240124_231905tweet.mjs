var Tweet = /** @class */ (function () {
    function Tweet() {
        this.up = function (store) {
            store.createTable("tweet", function (table) {
                table.column("tweetId").varchar(255).primary();
                table.createdAt();
            });
            store.createTable("expireTweet", function (table) {
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
            store.createTable("retweetUser", function (table) {
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
            store.createTable("likeTweetUser", function (table) {
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
        this.down = function () {
            throw new Error("Down is not implemented on tweet");
        };
    }
    return Tweet;
}());
export default Tweet;