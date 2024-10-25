var ChannelMessage = /** @class */ (function () {
    function ChannelMessage() {
        this.up = function (store) {
            store.createTable("channelMessage", function (table) {
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
        this.down = function () {
            throw new Error("Down is not implemented on channelMessage");
        };
    }
    return ChannelMessage;
}());
export default ChannelMessage;