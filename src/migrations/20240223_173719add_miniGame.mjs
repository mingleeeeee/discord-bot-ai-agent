var sqls = [
    "INSERT INTO miniGame (name, winRate, maxDebt, maxBet, minBet) VALUES ('roulette', 0, 3000, 3000, 1)",
    "INSERT INTO miniGame (name, winRate, maxDebt, maxBet, minBet) VALUES ('slot', 50, 3000, 3000, 1)",
    "INSERT INTO miniGame (name, winRate, maxDebt, maxBet, minBet) VALUES ('blackjack', 0, 3000, 3000, 1)",
];
var Add_miniGame = /** @class */ (function () {
    function Add_miniGame() {
        this.up = function (store) {
            store.sql.apply(store, sqls);
        };
        this.down = function () {
            throw new Error("Down is not implemented on add_miniGame");
        };
    }
    return Add_miniGame;
}());
export default Add_miniGame;