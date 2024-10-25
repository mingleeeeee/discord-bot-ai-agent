/* eslint-disable */
import { DebtWithRelations } from "../../relationMap";
import {
  DebtIdentifiable,
  Debt,
  DebtCreatable,
  DebtUpdatable,
} from "../../entities/Debt";
import { DebtFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<DebtWithRelations> & DebtIdentifiable;
export abstract class GeneratedDebtDBDataSource extends BaseDBDataSource<
  Debt,
  DebtIdentifiable,
  DebtCreatable,
  DebtUpdatable,
  DebtFields,
  QueryResult
> {
  readonly tableName: string = "debt";
  readonly fields: Array<string> = ["id", "balance", "updatedAt", "borrowed"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = undefined;
  protected getDefaultValueString(): Pick<Debt, "updatedAt"> {
    return { updatedAt: getCurrentDateTimeString() };
  }
  findById(
    id: string,
    fields?: DebtFields,
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
