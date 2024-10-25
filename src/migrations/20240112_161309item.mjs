var Item = /** @class */ (function () {
    function Item() {
        this.up = function (store) {
            store.createTable("item", function (table) {
                table.column("id").int().autoIncrement().unsigned().primary();
                table.column("name").varchar(255);
                table.column("description").varchar(255);
                table.column("status").varchar(255);
                table.createdAt();
            });
            store.createTable("itemBalance", function (table) {
                table.column("id").int().unsigned().autoIncrement().primary();
                table.references({
                    parentTable: "item",
                    parentColumn: "id",
                    parentFieldName: "itemBalance",
                    columnName: "itemId",
                    relation: "Many",
                });
                table.references({
                    parentTable: "user",
                    parentColumn: "id",
                    parentFieldName: "itemBalance",
                    columnName: "userId",
                    relation: "Many",
                });
                table.column("balance").int().unsigned();
                table.updatedAt();
            });
        };
        this.down = function () {
            throw new Error("Down is not implemented on item");
        };
    }
    return Item;
}());
export default Item;