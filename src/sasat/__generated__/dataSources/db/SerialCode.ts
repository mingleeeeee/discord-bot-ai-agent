/* eslint-disable */
import { SerialCodeWithRelations } from "../../relationMap";
import {
  SerialCodeIdentifiable,
  SerialCode,
  SerialCodeCreatable,
  SerialCodeUpdatable,
} from "../../entities/SerialCode";
import { SerialCodeFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<SerialCodeWithRelations> & SerialCodeIdentifiable;
export abstract class GeneratedSerialCodeDBDataSource extends BaseDBDataSource<
  SerialCode,
  SerialCodeIdentifiable,
  SerialCodeCreatable,
  SerialCodeUpdatable,
  SerialCodeFields,
  QueryResult
> {
  readonly tableName: string = "serialCode";
  readonly fields: Array<string> = ["id", "code", "createdAt"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = undefined;
  protected getDefaultValueString(): Pick<SerialCode, "createdAt"> {
    return { createdAt: getCurrentDateTimeString() };
  }
  findById(
    id: string,
    fields?: SerialCodeFields,
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