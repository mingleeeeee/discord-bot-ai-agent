/* eslint-disable */
import { TaskTypeWithRelations } from "../../relationMap";
import {
  TaskTypeIdentifiable,
  TaskType,
  TaskTypeCreatable,
  TaskTypeUpdatable,
} from "../../entities/TaskType";
import { TaskTypeFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<TaskTypeWithRelations> & TaskTypeIdentifiable;
export abstract class GeneratedTaskTypeDBDataSource extends BaseDBDataSource<
  TaskType,
  TaskTypeIdentifiable,
  TaskTypeCreatable,
  TaskTypeUpdatable,
  TaskTypeFields,
  QueryResult
> {
  readonly tableName: string = "taskType";
  readonly fields: Array<string> = [
    "id",
    "type",
    "repetitive",
    "reward",
    "createdAt",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Pick<TaskType, "createdAt"> {
    return { createdAt: getCurrentDateTimeString() };
  }
  findById(
    id: number,
    fields?: TaskTypeFields,
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
