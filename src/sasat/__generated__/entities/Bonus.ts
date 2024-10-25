/* eslint-disable */
export type Bonus = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly bonusTaskId: number;
  readonly amount: number;
  readonly startAt: string;
  readonly endAt: string;
};
export type BonusCreatable = {
  readonly taskTypeId: number;
  readonly bonusTaskId: number;
  readonly amount: number;
  readonly startAt: string;
  readonly endAt: string;
};
export type BonusUpdatable = {
  readonly id: number;
  readonly bonusTaskId?: number | null;
  readonly amount?: number | null;
  readonly startAt?: string | null;
  readonly endAt?: string | null;
};
export type BonusIdentifiable = { readonly id: number };
