/* eslint-disable */
export type Currency = {
  readonly id: number;
  readonly symbol: string;
  readonly createdAt: string;
};
export type CurrencyCreatable = { readonly symbol: string };
export type CurrencyUpdatable = {
  readonly id: number;
  readonly symbol?: string | null;
};
export type CurrencyIdentifiable = { readonly id: number };
