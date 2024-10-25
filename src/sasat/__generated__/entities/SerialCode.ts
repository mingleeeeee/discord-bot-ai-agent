/* eslint-disable */
export type SerialCode = {
  readonly id: string;
  readonly code: string;
  readonly createdAt: string;
};
export type SerialCodeCreatable = {
  readonly id: string;
  readonly code: string;
};
export type SerialCodeUpdatable = {
  readonly id: string;
  readonly code?: string | null;
};
export type SerialCodeIdentifiable = { readonly id: string };
