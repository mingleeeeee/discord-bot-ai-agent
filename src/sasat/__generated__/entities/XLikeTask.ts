/* eslint-disable */
export type XLikeTask = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly tweetId: string;
  readonly deadline: string;
};
export type XLikeTaskCreatable = {
  readonly taskTypeId: number;
  readonly tweetId: string;
  readonly deadline: string;
};
export type XLikeTaskUpdatable = {
  readonly id: number;
  readonly tweetId?: string | null;
  readonly deadline?: string | null;
};
export type XLikeTaskIdentifiable = { readonly id: number };
