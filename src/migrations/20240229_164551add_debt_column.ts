import { SasatMigration, MigrationStore } from "sasat";

export default class Add_debt_column implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store
      .table("debt")
      .addColumn("borrowed", (column) => column.int().unsigned().notNull());
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on add_debt_column");
  };
}
