var ReplyTweetUser = /** @class */ (function () {
    function ReplyTweetUser() {
        this.up = function (store) {
            store.createTable("replyTweetUser", function (table) {
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
        this.down = function () {
            throw new Error("Down is not implemented on replyTweetUser");
        };
    }
    return ReplyTweetUser;
}());
export default ReplyTweetUser;