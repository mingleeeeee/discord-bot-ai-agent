/* eslint-disable */
export type Balance = {
  readonly id: string;
  readonly balance: number;
  readonly updatedAt: string;
};
export type BalanceCreatable = {
  readonly id: string;
  readonly balance: number;
};
export type BalanceUpdatable = {
  readonly id: string;
  readonly balance?: number | null;
};
export type BalanceIdentifiable = { readonly id: string };
