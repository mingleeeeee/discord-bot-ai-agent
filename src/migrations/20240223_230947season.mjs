var Season = /** @class */ (function () {
    function Season() {
        this.up = function (store) {
            store.createTable("season", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.column("name").varchar(255);
                table.column("startBalance").int().unsigned();
                table.column("nextStartBalance").int().unsigned();
                table.column("duration").varchar(255);
                table.column("startAt").varchar(255);
                table.column("endAt").varchar(255);
                table.column("status").varchar(255);
                table.createdAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on season");
        };
    }
    return Season;
}());
export default Season;