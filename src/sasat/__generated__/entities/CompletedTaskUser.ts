/* eslint-disable */
export type CompletedTaskUser = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly completedTaskId: number;
  readonly userId: string;
  readonly completedAt: string;
};
export type CompletedTaskUserCreatable = {
  readonly taskTypeId: number;
  readonly completedTaskId: number;
  readonly userId: string;
  readonly completedAt: string;
};
export type CompletedTaskUserUpdatable = {
  readonly id: number;
  readonly completedTaskId?: number | null;
  readonly completedAt?: string | null;
};
export type CompletedTaskUserIdentifiable = { readonly id: number };
