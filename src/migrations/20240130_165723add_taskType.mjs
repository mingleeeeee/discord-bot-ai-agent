var sqls = [
    "INSERT INTO taskType (type, repetitive, reward) VALUES ('login', 1, 100)",
    "INSERT INTO taskType (type, repetitive, reward) VALUES ('discordPost', 0, 100)",
    "INSERT INTO taskType (type, repetitive, reward) VALUES ('xRetweet', 0, 100)",
    "INSERT INTO taskType (type, repetitive, reward) VALUES ('xLike', 0, 100)",
    "INSERT INTO taskType (type, repetitive, reward) VALUES ('rob', 1, 100)",
    "INSERT INTO taskType (type, repetitive, reward) VALUES ('crime', 1, 100)",
];
var Add_taskType = /** @class */ (function () {
    function Add_taskType() {
        this.up = function (store) {
            store.sql.apply(store, sqls);
        };
        this.down = function () {
            throw new Error("Down is not implemented on add_taskType");
        };
    }
    return Add_taskType;
}());
export default Add_taskType;