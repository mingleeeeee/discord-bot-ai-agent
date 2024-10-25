/* eslint-disable */
import { BalanceWithRelations } from "../../relationMap";
import {
  BalanceIdentifiable,
  Balance,
  BalanceCreatable,
  BalanceUpdatable,
} from "../../entities/Balance";
import { BalanceFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<BalanceWithRelations> & BalanceIdentifiable;
export abstract class GeneratedBalanceDBDataSource extends BaseDBDataSource<
  Balance,
  BalanceIdentifiable,
  BalanceCreatable,
  BalanceUpdatable,
  BalanceFields,
  QueryResult
> {
  readonly tableName: string = "balance";
  readonly fields: Array<string> = ["id", "balance", "updatedAt"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = undefined;
  protected getDefaultValueString(): Pick<Balance, "updatedAt"> {
    return { updatedAt: getCurrentDateTimeString() };
  }
  findById(
    id: string,
    fields?: BalanceFields,
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
