/* eslint-disable */
export type CrimeTask = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly duration: string;
  readonly penalty: number;
  readonly winRate: number;
};
export type CrimeTaskCreatable = {
  readonly taskTypeId: number;
  readonly duration: string;
  readonly penalty: number;
  readonly winRate: number;
};
export type CrimeTaskUpdatable = {
  readonly id: number;
  readonly duration?: string | null;
  readonly penalty?: number | null;
  readonly winRate?: number | null;
};
export type CrimeTaskIdentifiable = { readonly id: number };
