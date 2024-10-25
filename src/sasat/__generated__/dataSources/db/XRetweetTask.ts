/* eslint-disable */
import { XRetweetTaskWithRelations } from "../../relationMap";
import {
  XRetweetTaskIdentifiable,
  XRetweetTask,
  XRetweetTaskCreatable,
  XRetweetTaskUpdatable,
} from "../../entities/XRetweetTask";
import { XRetweetTaskFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<XRetweetTaskWithRelations> &
  XRetweetTaskIdentifiable;
export abstract class GeneratedXRetweetTaskDBDataSource extends BaseDBDataSource<
  XRetweetTask,
  XRetweetTaskIdentifiable,
  XRetweetTaskCreatable,
  XRetweetTaskUpdatable,
  XRetweetTaskFields,
  QueryResult
> {
  readonly tableName: string = "xRetweetTask";
  readonly fields: Array<string> = ["id", "taskTypeId", "tweetId", "deadline"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<XRetweetTask> {
    return {};
  }
  findById(
    id: number,
    fields?: XRetweetTaskFields,
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
