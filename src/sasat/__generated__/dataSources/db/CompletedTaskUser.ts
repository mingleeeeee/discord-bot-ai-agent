/* eslint-disable */
import { CompletedTaskUserWithRelations } from "../../relationMap";
import {
  CompletedTaskUserIdentifiable,
  CompletedTaskUser,
  CompletedTaskUserCreatable,
  CompletedTaskUserUpdatable,
} from "../../entities/CompletedTaskUser";
import { CompletedTaskUserFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<CompletedTaskUserWithRelations> &
  CompletedTaskUserIdentifiable;
export abstract class GeneratedCompletedTaskUserDBDataSource extends BaseDBDataSource<
  CompletedTaskUser,
  CompletedTaskUserIdentifiable,
  CompletedTaskUserCreatable,
  CompletedTaskUserUpdatable,
  CompletedTaskUserFields,
  QueryResult
> {
  readonly tableName: string = "completedTaskUser";
  readonly fields: Array<string> = [
    "id",
    "taskTypeId",
    "completedTaskId",
    "userId",
    "completedAt",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<CompletedTaskUser> {
    return {};
  }
  findById(
    id: number,
    fields?: CompletedTaskUserFields,
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
