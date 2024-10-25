/* eslint-disable */
import { SeasonWithRelations } from "../../relationMap";
import {
  SeasonIdentifiable,
  Season,
  SeasonCreatable,
  SeasonUpdatable,
} from "../../entities/Season";
import { SeasonFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<SeasonWithRelations> & SeasonIdentifiable;
export abstract class GeneratedSeasonDBDataSource extends BaseDBDataSource<
  Season,
  SeasonIdentifiable,
  SeasonCreatable,
  SeasonUpdatable,
  SeasonFields,
  QueryResult
> {
  readonly tableName: string = "season";
  readonly fields: Array<string> = [
    "id",
    "name",
    "startBalance",
    "nextStartBalance",
    "duration",
    "startAt",
    "endAt",
    "status",
    "createdAt",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Pick<Season, "createdAt"> {
    return { createdAt: getCurrentDateTimeString() };
  }
  findById(
    id: number,
    fields?: SeasonFields,
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
