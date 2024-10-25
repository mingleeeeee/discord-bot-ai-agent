import { SeasonReservationDBDataSource } from "@/sasat/dataSources/db/SeasonReservation";
import { QExpr } from "sasat";

const reservationDb = new SeasonReservationDBDataSource();

export const getReservationById = async (reservationId: number) => {
  try {
    const res = await reservationDb.findById(
      reservationId,
      { fields: ["id", "startAt"] },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get reservation by id: ${error}`);
  }
};

export const createReservation = async (startAt: string) => {
  try {
    const res = await reservationDb.create({
      startAt: startAt,
    });
    return res;
  } catch (error) {
    console.error(`Failed to create reservation: ${error}`);
  }
};

export const updateReservation = async (
  reservationId: number,
  startAt: string
) => {
  try {
    const res = await reservationDb.update({
      id: reservationId,
      startAt: startAt,
    });
    return res;
  } catch (error) {
    console.error(`Failed to update reservation: ${error}`);
  }
};

export const storeReservation = async (
  reservationId: number,
  startAt: string
) => {
  try {
    // check if reservation exists
    const res = await getReservationById(reservationId);

    // not exists
    if (!res) {
      await createReservation(startAt);
      return true;
    } else {
      await reservationDb.update({
        id: reservationId,
        startAt: startAt,
      });
      return res;
    }
  } catch (error) {
    console.error(`Failed to update reservation: ${error}`);
  }
};

export const getFirstReservation = async () => {
  try {
    const res = await reservationDb.find(
      {
        fields: ["id", "startAt"],
      },
      {
        sort: [QExpr.sort(QExpr.field("t0", "id"), "ASC")],
        limit: 1,
        lock: "FOR UPDATE",
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return;
  }
};
