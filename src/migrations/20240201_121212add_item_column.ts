import { SasatMigration, MigrationStore } from "sasat";

export default class Add_item_column implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.table("item").addColumn("image", (column) => column.varchar(255));
    store
      .table("item")
      .addColumn("maxiumPerPesron", (column) => column.int().unsigned());
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on add_item_column");
  };
}
