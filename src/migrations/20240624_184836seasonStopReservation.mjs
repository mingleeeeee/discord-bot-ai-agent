var SeasonStopReservation = /** @class */ (function () {
    function SeasonStopReservation() {
        this.up = function (store) {
            store.createTable("seasonStopReservation", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.column("stopAt").varchar(255);
                table.updatedAt();
                table.createdAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on seasonStopReservation");
        };
    }
    return SeasonStopReservation;
}());
export default SeasonStopReservation;