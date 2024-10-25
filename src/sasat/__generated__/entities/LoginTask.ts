/* eslint-disable */
export type LoginTask = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly duration: string;
  readonly startAt: string;
  readonly endAt: string;
  readonly channelId: string;
};
export type LoginTaskCreatable = {
  readonly taskTypeId: number;
  readonly duration: string;
  readonly startAt: string;
  readonly endAt: string;
  readonly channelId: string;
};
export type LoginTaskUpdatable = {
  readonly id: number;
  readonly duration?: string | null;
  readonly startAt?: string | null;
  readonly endAt?: string | null;
  readonly channelId?: string | null;
};
export type LoginTaskIdentifiable = { readonly id: number };
