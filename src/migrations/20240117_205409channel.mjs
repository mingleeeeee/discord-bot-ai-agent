var Channel = /** @class */ (function () {
    function Channel() {
        this.up = function (store) {
            store.createTable("channel", function (table) {
                table.column("channelId").varchar(255).primary();
                table.column("amount").int().unsigned(); // the bonus amount
                table.column("cooldown").int().unsigned(); // the cooldown time
                table.column("status").varchar(255); // the status of the channel
                table.createdAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on channel");
        };
    }
    return Channel;
}());
export default Channel;