/* eslint-disable */
export type ItemBalance = {
  readonly id: number;
  readonly itemId: number;
  readonly userId: string;
  readonly balance: number;
  readonly updatedAt: string;
};
export type ItemBalanceCreatable = {
  readonly itemId: number;
  readonly userId: string;
  readonly balance: number;
};
export type ItemBalanceUpdatable = {
  readonly id: number;
  readonly balance?: number | null;
};
export type ItemBalanceIdentifiable = { readonly id: number };
