/* eslint-disable */
export type SeasonReservation = {
  readonly id: number;
  readonly startAt: string;
  readonly createdAt: string;
};
export type SeasonReservationCreatable = { readonly startAt: string };
export type SeasonReservationUpdatable = {
  readonly id: number;
  readonly startAt?: string | null;
};
export type SeasonReservationIdentifiable = { readonly id: number };
