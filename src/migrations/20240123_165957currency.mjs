var Currency = /** @class */ (function () {
    function Currency() {
        this.up = function (store) {
            store.createTable("currency", function (table) {
                table.column("id").int().autoIncrement().unsigned().primary();
                table.column("symbol").varchar(255);
                table.createdAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on currency");
        };
    }
    return Currency;
}());
export default Currency;