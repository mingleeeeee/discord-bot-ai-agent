/* eslint-disable */
import { MiniGameWithRelations } from "../../relationMap";
import {
  MiniGameIdentifiable,
  MiniGame,
  MiniGameCreatable,
  MiniGameUpdatable,
} from "../../entities/MiniGame";
import { MiniGameFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<MiniGameWithRelations> & MiniGameIdentifiable;
export abstract class GeneratedMiniGameDBDataSource extends BaseDBDataSource<
  MiniGame,
  MiniGameIdentifiable,
  MiniGameCreatable,
  MiniGameUpdatable,
  MiniGameFields,
  QueryResult
> {
  readonly tableName: string = "miniGame";
  readonly fields: Array<string> = [
    "id",
    "name",
    "winRate",
    "maxDebt",
    "maxBet",
    "minBet",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<MiniGame> {
    return {};
  }
  findById(
    id: number,
    fields?: MiniGameFields,
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
