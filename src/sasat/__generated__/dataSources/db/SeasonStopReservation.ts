/* eslint-disable */
import { SeasonStopReservationWithRelations } from "../../relationMap";
import {
  SeasonStopReservationIdentifiable,
  SeasonStopReservation,
  SeasonStopReservationCreatable,
  SeasonStopReservationUpdatable,
} from "../../entities/SeasonStopReservation";
import { SeasonStopReservationFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<SeasonStopReservationWithRelations> &
  SeasonStopReservationIdentifiable;
export abstract class GeneratedSeasonStopReservationDBDataSource extends BaseDBDataSource<
  SeasonStopReservation,
  SeasonStopReservationIdentifiable,
  SeasonStopReservationCreatable,
  SeasonStopReservationUpdatable,
  SeasonStopReservationFields,
  QueryResult
> {
  readonly tableName: string = "seasonStopReservation";
  readonly fields: Array<string> = ["id", "stopAt", "updatedAt", "createdAt"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Pick<
    SeasonStopReservation,
    "updatedAt" | "createdAt"
  > {
    return {
      updatedAt: getCurrentDateTimeString(),
      createdAt: getCurrentDateTimeString(),
    };
  }
  findById(
    id: number,
    fields?: SeasonStopReservationFields,
    options?: Omit<QueryOptions, "offset" | "limit" | "sort">,
    context?: GQLContext,
  ): Promise<QueryResult | null> {
    const tableName = fields?.tableAlias || "t0";
    return this.first(
      fields,
      {
        ...options,
        where: qe.and(
          qe.eq(qe.field(tableName, "id"), qe.value(id)),
          options?.where,
        ),
      },
      context,
    );
  }
}
