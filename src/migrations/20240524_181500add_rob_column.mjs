var Add_rob_column = /** @class */ (function () {
    function Add_rob_column() {
        this.up = function (store) {
            store
                .table("robTask")
                .addColumn("stolenRole", function (column) { return column.varchar(255); });
        };
        this.down = function () {
            throw new Error("Down is not implemented on add_rob_column");
        };
    }
    return Add_rob_column;
}());
export default Add_rob_column;