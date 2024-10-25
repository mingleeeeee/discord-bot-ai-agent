var DailyLogin = /** @class */ (function () {
    function DailyLogin() {
        this.up = function (store) {
            store.createTable("dailyLogin", function (table) {
                table
                    .references({
                    parentTable: "user",
                    parentColumn: "id",
                    parentFieldName: "dailyLogin",
                    columnName: "id",
                    relation: "OneOrZero",
                })
                    .primary();
                table.column("last_login").varchar(255);
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on dailyLogin");
        };
    }
    return DailyLogin;
}());
export default DailyLogin;