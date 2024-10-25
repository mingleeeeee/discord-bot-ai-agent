var Add_item_column = /** @class */ (function () {
    function Add_item_column() {
        this.up = function (store) {
            store.table("item").addColumn("reset", function (column) { return column.varchar(255); });
        };
        this.down = function () {
            throw new Error("Down is not implemented on add_item_column");
        };
    }
    return Add_item_column;
}());
export default Add_item_column;