var MiniGame = /** @class */ (function () {
    function MiniGame() {
        this.up = function (store) {
            store.createTable("miniGame", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.column("name").varchar(255);
                table.column("winRate").int().unsigned();
                table.column("maxDebt").int().unsigned();
                table.column("maxBet").int().unsigned();
                table.column("minBet").int().unsigned();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on miniGame");
        };
    }
    return MiniGame;
}());
export default MiniGame;