/* eslint-disable */
import { RobTaskWithRelations } from "../../relationMap";
import {
  RobTaskIdentifiable,
  RobTask,
  RobTaskCreatable,
  RobTaskUpdatable,
} from "../../entities/RobTask";
import { RobTaskFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<RobTaskWithRelations> & RobTaskIdentifiable;
export abstract class GeneratedRobTaskDBDataSource extends BaseDBDataSource<
  RobTask,
  RobTaskIdentifiable,
  RobTaskCreatable,
  RobTaskUpdatable,
  RobTaskFields,
  QueryResult
> {
  readonly tableName: string = "robTask";
  readonly fields: Array<string> = [
    "id",
    "taskTypeId",
    "duration",
    "penalty",
    "winRate",
    "stolenRole",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<RobTask> {
    return {};
  }
  findById(
    id: number,
    fields?: RobTaskFields,
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
