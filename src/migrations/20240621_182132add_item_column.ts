import { SasatMigration, MigrationStore } from "sasat";

export default class Add_item_column implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.table("item").addColumn("reset", (column) => column.varchar(255));
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on add_item_column");
  };
}
