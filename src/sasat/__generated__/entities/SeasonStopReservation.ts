/* eslint-disable */
export type SeasonStopReservation = {
  readonly id: number;
  readonly stopAt: string;
  readonly updatedAt: string;
  readonly createdAt: string;
};
export type SeasonStopReservationCreatable = { readonly stopAt: string };
export type SeasonStopReservationUpdatable = {
  readonly id: number;
  readonly stopAt?: string | null;
};
export type SeasonStopReservationIdentifiable = { readonly id: number };
