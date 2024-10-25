var User = /** @class */ (function () {
    function User() {
        this.up = function (store) {
            store.createTable("user", function (table) {
                table.column("id").varchar(255).primary();
                table.createdAt();
            });
            store.createTable("balance", function (table) {
                table
                    .references({
                    parentTable: "user",
                    parentColumn: "id",
                    parentFieldName: "balance",
                    columnName: "id",
                    relation: "OneOrZero",
                })
                    .primary();
                table.column("balance").int().unsigned();
                table.updatedAt();
            });
            store.createTable("debt", function (table) {
                table
                    .references({
                    parentTable: "user",
                    parentColumn: "id",
                    parentFieldName: "debt",
                    columnName: "id",
                    relation: "OneOrZero",
                })
                    .primary();
                table.column("balance").int().unsigned();
                table.updatedAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on user");
        };
    }
    return User;
}());
export default User;