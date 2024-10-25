/* eslint-disable */
export type TaskType = {
  readonly id: number;
  readonly type: string;
  readonly repetitive: number;
  readonly reward: number;
  readonly createdAt: string;
};
export type TaskTypeCreatable = {
  readonly type: string;
  readonly repetitive: number;
  readonly reward: number;
};
export type TaskTypeUpdatable = {
  readonly id: number;
  readonly type?: string | null;
  readonly repetitive?: number | null;
  readonly reward?: number | null;
};
export type TaskTypeIdentifiable = { readonly id: number };
