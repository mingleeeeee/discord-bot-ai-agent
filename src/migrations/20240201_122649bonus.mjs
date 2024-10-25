var Bonus = /** @class */ (function () {
    function Bonus() {
        this.up = function (store) {
            store.createTable("bonus", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "taskType",
                    parentColumn: "id",
                    parentFieldName: "bonus",
                    columnName: "taskTypeId",
                    relation: "Many",
                });
                table.column("bonusTaskId").int().unsigned();
                table.column("amount").int().unsigned();
                table.column("startAt").varchar(255);
                table.column("endAt").varchar(255);
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on bonus");
        };
    }
    return Bonus;
}());
export default Bonus;