/* eslint-disable */
export type XRetweetTask = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly tweetId: string;
  readonly deadline: string;
};
export type XRetweetTaskCreatable = {
  readonly taskTypeId: number;
  readonly tweetId: string;
  readonly deadline: string;
};
export type XRetweetTaskUpdatable = {
  readonly id: number;
  readonly tweetId?: string | null;
  readonly deadline?: string | null;
};
export type XRetweetTaskIdentifiable = { readonly id: number };
