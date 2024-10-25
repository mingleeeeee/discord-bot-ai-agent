/* eslint-disable */
import { CurrencyWithRelations } from "../../relationMap";
import {
  CurrencyIdentifiable,
  Currency,
  CurrencyCreatable,
  CurrencyUpdatable,
} from "../../entities/Currency";
import { CurrencyFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<CurrencyWithRelations> & CurrencyIdentifiable;
export abstract class GeneratedCurrencyDBDataSource extends BaseDBDataSource<
  Currency,
  CurrencyIdentifiable,
  CurrencyCreatable,
  CurrencyUpdatable,
  CurrencyFields,
  QueryResult
> {
  readonly tableName: string = "currency";
  readonly fields: Array<string> = ["id", "symbol", "createdAt"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Pick<Currency, "createdAt"> {
    return { createdAt: getCurrentDateTimeString() };
  }
  findById(
    id: number,
    fields?: CurrencyFields,
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
