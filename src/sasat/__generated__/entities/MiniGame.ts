/* eslint-disable */
export type MiniGame = {
  readonly id: number;
  readonly name: string;
  readonly winRate: number;
  readonly maxDebt: number;
  readonly maxBet: number;
  readonly minBet: number;
};
export type MiniGameCreatable = {
  readonly name: string;
  readonly winRate: number;
  readonly maxDebt: number;
  readonly maxBet: number;
  readonly minBet: number;
};
export type MiniGameUpdatable = {
  readonly id: number;
  readonly name?: string | null;
  readonly winRate?: number | null;
  readonly maxDebt?: number | null;
  readonly maxBet?: number | null;
  readonly minBet?: number | null;
};
export type MiniGameIdentifiable = { readonly id: number };
