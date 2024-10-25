var SeasonReservation = /** @class */ (function () {
    function SeasonReservation() {
        this.up = function (store) {
            store.createTable("seasonReservation", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.column("startAt").varchar(255);
                table.createdAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on seasonReservation");
        };
    }
    return SeasonReservation;
}());
export default SeasonReservation;