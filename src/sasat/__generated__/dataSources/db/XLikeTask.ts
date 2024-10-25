/* eslint-disable */
import { XLikeTaskWithRelations } from "../../relationMap";
import {
  XLikeTaskIdentifiable,
  XLikeTask,
  XLikeTaskCreatable,
  XLikeTaskUpdatable,
} from "../../entities/XLikeTask";
import { XLikeTaskFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<XLikeTaskWithRelations> & XLikeTaskIdentifiable;
export abstract class GeneratedXLikeTaskDBDataSource extends BaseDBDataSource<
  XLikeTask,
  XLikeTaskIdentifiable,
  XLikeTaskCreatable,
  XLikeTaskUpdatable,
  XLikeTaskFields,
  QueryResult
> {
  readonly tableName: string = "xLikeTask";
  readonly fields: Array<string> = ["id", "taskTypeId", "tweetId", "deadline"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<XLikeTask> {
    return {};
  }
  findById(
    id: number,
    fields?: XLikeTaskFields,
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
