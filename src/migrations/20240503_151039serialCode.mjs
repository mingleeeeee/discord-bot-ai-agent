var SerialCode = /** @class */ (function () {
    function SerialCode() {
        this.up = function (store) {
            store.createTable("serialCode", function (table) {
                table.column("id").varchar(255).primary();
                table.column("code").varchar(255);
                table.createdAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on serialCode");
        };
    }
    return SerialCode;
}());
export default SerialCode;