import { SeasonStopReservationDBDataSource } from "@/sasat/dataSources/db/SeasonStopReservation";
import { QExpr } from "sasat";

const stopReservationDb = new SeasonStopReservationDBDataSource();
export const getStopReservationById = async (reservationId: number) => {
  try {
    const res = await stopReservationDb.findById(
      reservationId,
      { fields: ["id", "stopAt"] },
      { lock: "FOR UPDATE" }
    );
    return res;
  } catch (error) {
    console.error(`Failed to get stop reservation by id: ${error}`);
  }
};

export const createStopReservation = async (stopAt: string) => {
  try {
    const res = await stopReservationDb.create({
      stopAt: stopAt,
    });
    return res;
  } catch (error) {
    console.error(`Failed to create stop reservation: ${error}`);
  }
};

export const updateReservation = async (
  reservationId: number,
  stopAt: string
) => {
  try {
    const res = await stopReservationDb.update({
      id: reservationId,
      stopAt: stopAt,
    });
    return res;
  } catch (error) {
    console.error(`Failed to update stop reservation: ${error}`);
  }
};

export const storeStopReservation = async (
  reservationId: number,
  stopAt: string
) => {
  try {
    // check if reservation exists
    const res = await getStopReservationById(reservationId);

    // not exists
    if (!res) {
      await createStopReservation(stopAt);
      return true;
    } else {
      // exists
      await stopReservationDb.update({
        id: reservationId,
        stopAt: stopAt,
      });
      return res;
    }
  } catch (error) {
    console.error(`Failed to update stop reservation: ${error}`);
  }
};

export const getFirstStopReservation = async () => {
  try {
    const res = await stopReservationDb.find(
      {
        fields: ["id", "stopAt"],
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
