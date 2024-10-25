/* eslint-disable */
export type Season = {
  readonly id: number;
  readonly name: string;
  readonly startBalance: number;
  readonly nextStartBalance: number;
  readonly duration: string;
  readonly startAt: string;
  readonly endAt: string;
  readonly status: string;
  readonly createdAt: string;
};
export type SeasonCreatable = {
  readonly name: string;
  readonly startBalance: number;
  readonly nextStartBalance: number;
  readonly duration: string;
  readonly startAt: string;
  readonly endAt: string;
  readonly status: string;
};
export type SeasonUpdatable = {
  readonly id: number;
  readonly name?: string | null;
  readonly startBalance?: number | null;
  readonly nextStartBalance?: number | null;
  readonly duration?: string | null;
  readonly startAt?: string | null;
  readonly endAt?: string | null;
  readonly status?: string | null;
};
export type SeasonIdentifiable = { readonly id: number };
