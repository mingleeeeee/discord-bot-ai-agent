/* eslint-disable */
import { LoginTaskWithRelations } from "../../relationMap";
import {
  LoginTaskIdentifiable,
  LoginTask,
  LoginTaskCreatable,
  LoginTaskUpdatable,
} from "../../entities/LoginTask";
import { LoginTaskFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<LoginTaskWithRelations> & LoginTaskIdentifiable;
export abstract class GeneratedLoginTaskDBDataSource extends BaseDBDataSource<
  LoginTask,
  LoginTaskIdentifiable,
  LoginTaskCreatable,
  LoginTaskUpdatable,
  LoginTaskFields,
  QueryResult
> {
  readonly tableName: string = "loginTask";
  readonly fields: Array<string> = [
    "id",
    "taskTypeId",
    "duration",
    "startAt",
    "endAt",
    "channelId",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<LoginTask> {
    return {};
  }
  findById(
    id: number,
    fields?: LoginTaskFields,
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
