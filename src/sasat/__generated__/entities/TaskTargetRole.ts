/* eslint-disable */
export type TaskTargetRole = {
  readonly id: number;
  readonly taskTypeId: number;
  readonly role: string;
};
export type TaskTargetRoleCreatable = {
  readonly taskTypeId: number;
  readonly role: string;
};
export type TaskTargetRoleUpdatable = {
  readonly id: number;
  readonly role?: string | null;
};
export type TaskTargetRoleIdentifiable = { readonly id: number };
