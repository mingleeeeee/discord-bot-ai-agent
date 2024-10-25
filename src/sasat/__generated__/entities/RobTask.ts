/* eslint-disable */
export type RobTask = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly duration: string;
  readonly penalty: number;
  readonly winRate: number;
  readonly stolenRole: string;
};
export type RobTaskCreatable = {
  readonly taskTypeId: number;
  readonly duration: string;
  readonly penalty: number;
  readonly winRate: number;
  readonly stolenRole: string;
};
export type RobTaskUpdatable = {
  readonly id: number;
  readonly duration?: string | null;
  readonly penalty?: number | null;
  readonly winRate?: number | null;
  readonly stolenRole?: string | null;
};
export type RobTaskIdentifiable = { readonly id: number };
