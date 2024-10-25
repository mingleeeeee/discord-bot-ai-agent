import { SasatMigration, MigrationStore } from "sasat";

export default class Add_rob_column implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store
      .table("robTask")
      .addColumn("stolenRole", (column) => column.varchar(255));
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on add_rob_column");
  };
}
