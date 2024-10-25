/* eslint-disable */
export type Debt = {
  readonly id: string;
  readonly balance: number;
  readonly updatedAt: string;
  readonly borrowed: number;
};
export type DebtCreatable = {
  readonly id: string;
  readonly balance: number;
  readonly borrowed: number;
};
export type DebtUpdatable = {
  readonly id: string;
  readonly balance?: number | null;
  readonly borrowed?: number | null;
};
export type DebtIdentifiable = { readonly id: string };
