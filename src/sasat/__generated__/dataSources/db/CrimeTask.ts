/* eslint-disable */
import { CrimeTaskWithRelations } from "../../relationMap";
import {
  CrimeTaskIdentifiable,
  CrimeTask,
  CrimeTaskCreatable,
  CrimeTaskUpdatable,
} from "../../entities/CrimeTask";
import { CrimeTaskFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<CrimeTaskWithRelations> & CrimeTaskIdentifiable;
export abstract class GeneratedCrimeTaskDBDataSource extends BaseDBDataSource<
  CrimeTask,
  CrimeTaskIdentifiable,
  CrimeTaskCreatable,
  CrimeTaskUpdatable,
  CrimeTaskFields,
  QueryResult
> {
  readonly tableName: string = "crimeTask";
  readonly fields: Array<string> = [
    "id",
    "taskTypeId",
    "duration",
    "penalty",
    "winRate",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<CrimeTask> {
    return {};
  }
  findById(
    id: number,
    fields?: CrimeTaskFields,
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
