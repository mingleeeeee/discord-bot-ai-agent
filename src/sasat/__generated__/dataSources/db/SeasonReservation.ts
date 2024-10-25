/* eslint-disable */
import { SeasonReservationWithRelations } from "../../relationMap";
import {
  SeasonReservationIdentifiable,
  SeasonReservation,
  SeasonReservationCreatable,
  SeasonReservationUpdatable,
} from "../../entities/SeasonReservation";
import { SeasonReservationFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<SeasonReservationWithRelations> &
  SeasonReservationIdentifiable;
export abstract class GeneratedSeasonReservationDBDataSource extends BaseDBDataSource<
  SeasonReservation,
  SeasonReservationIdentifiable,
  SeasonReservationCreatable,
  SeasonReservationUpdatable,
  SeasonReservationFields,
  QueryResult
> {
  readonly tableName: string = "seasonReservation";
  readonly fields: Array<string> = ["id", "startAt", "createdAt"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Pick<SeasonReservation, "createdAt"> {
    return { createdAt: getCurrentDateTimeString() };
  }
  findById(
    id: number,
    fields?: SeasonReservationFields,
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
