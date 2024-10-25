var Fine = /** @class */ (function () {
    function Fine() {
        this.up = function (store) {
            store.createTable("fineAmount", function (table) {
                table.column("id").int().autoIncrement().unsigned().primary();
                table.column("extremum").varchar(255);
                table.column("amount").int().unsigned();
                table.createdAt();
            });
            store.createTable("fineType", function (table) {
                table.column("id").int().autoIncrement().unsigned().primary();
                table.column("type").varchar(255);
                table.column("status").varchar(255);
                table.createdAt();
            });
            store.createTable("failPercentage", function (table) {
                table.column("id").int().autoIncrement().unsigned().primary();
                table.column("crimeType").varchar(255);
                table.column("percentage").int().unsigned();
                table.createdAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on fine");
        };
    }
    return Fine;
}());
export default Fine;