/* eslint-disable */
export type DiscordPostTask = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly includedString: string;
  readonly channelId: string;
};
export type DiscordPostTaskCreatable = {
  readonly taskTypeId: number;
  readonly includedString: string;
  readonly channelId: string;
};
export type DiscordPostTaskUpdatable = {
  readonly id: number;
  readonly includedString?: string | null;
  readonly channelId?: string | null;
};
export type DiscordPostTaskIdentifiable = { readonly id: number };
