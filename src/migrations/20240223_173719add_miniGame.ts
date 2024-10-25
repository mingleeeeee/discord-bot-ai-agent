import { SasatMigration, MigrationStore } from "sasat";

const sqls = [
  "INSERT INTO miniGame (name, winRate, maxDebt, maxBet, minBet) VALUES ('roulette', 0, 3000, 3000, 1)",
  "INSERT INTO miniGame (name, winRate, maxDebt, maxBet, minBet) VALUES ('slot', 50, 3000, 3000, 1)",
  "INSERT INTO miniGame (name, winRate, maxDebt, maxBet, minBet) VALUES ('blackjack', 0, 3000, 3000, 1)",
];

export default class Add_miniGame implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.sql(...sqls);
  };

  down: (store: MigrationStore) => void = () => {
    throw new Error("Down is not implemented on add_miniGame");
  };
}
