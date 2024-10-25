var Add_item_column = /** @class */ (function () {
    function Add_item_column() {
        this.up = function (store) {
            store
                .table("item")
                .addColumn("price", function (column) { return column.int().unsigned().notNull(); });
            store
                .table("item")
                .addColumn("balance", function (column) { return column.int().unsigned().notNull(); });
        };
        this.down = function () {
            throw new Error("Down is not implemented on add_item_column");
        };
    }
    return Add_item_column;
}());
export default Add_item_column;