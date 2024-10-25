/* eslint-disable */
import { TaskTargetRoleWithRelations } from "../../relationMap";
import {
  TaskTargetRoleIdentifiable,
  TaskTargetRole,
  TaskTargetRoleCreatable,
  TaskTargetRoleUpdatable,
} from "../../entities/TaskTargetRole";
import { TaskTargetRoleFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<TaskTargetRoleWithRelations> &
  TaskTargetRoleIdentifiable;
export abstract class GeneratedTaskTargetRoleDBDataSource extends BaseDBDataSource<
  TaskTargetRole,
  TaskTargetRoleIdentifiable,
  TaskTargetRoleCreatable,
  TaskTargetRoleUpdatable,
  TaskTargetRoleFields,
  QueryResult
> {
  readonly tableName: string = "taskTargetRole";
  readonly fields: Array<string> = ["id", "taskTypeId", "role"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<TaskTargetRole> {
    return {};
  }
  findById(
    id: number,
    fields?: TaskTargetRoleFields,
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
