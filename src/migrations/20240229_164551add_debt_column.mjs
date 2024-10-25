var Add_debt_column = /** @class */ (function () {
    function Add_debt_column() {
        this.up = function (store) {
            store
                .table("debt")
                .addColumn("borrowed", function (column) { return column.int().unsigned().notNull(); });
        };
        this.down = function () {
            throw new Error("Down is not implemented on add_debt_column");
        };
    }
    return Add_debt_column;
}());
export default Add_debt_column;