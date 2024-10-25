var Game = /** @class */ (function () {
    function Game() {
        this.up = function (store) {
            store.createTable("game", function (table) {
                table.column("id").int().autoIncrement().unsigned().primary();
                table.column("name").varchar(255);
                table.createdAt();
            });
            store.createTable("betLimit", function (table) {
                table.column("id").int().autoIncrement().unsigned().primary();
                table.references({
                    parentTable: "game",
                    parentColumn: "id",
                    parentFieldName: "betLimit",
                    columnName: "gameId",
                    relation: "Many",
                });
                table.column("extremum").varchar(255);
                table.column("amount").int().unsigned();
                table.createdAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on game");
        };
    }
    return Game;
}());
export default Game;