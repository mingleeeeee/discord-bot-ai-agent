/* eslint-disable */
import { ItemBalanceWithRelations } from "../../relationMap";
import {
  ItemBalanceIdentifiable,
  ItemBalance,
  ItemBalanceCreatable,
  ItemBalanceUpdatable,
} from "../../entities/ItemBalance";
import { ItemBalanceFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<ItemBalanceWithRelations> & ItemBalanceIdentifiable;
export abstract class GeneratedItemBalanceDBDataSource extends BaseDBDataSource<
  ItemBalance,
  ItemBalanceIdentifiable,
  ItemBalanceCreatable,
  ItemBalanceUpdatable,
  ItemBalanceFields,
  QueryResult
> {
  readonly tableName: string = "itemBalance";
  readonly fields: Array<string> = [
    "id",
    "itemId",
    "userId",
    "balance",
    "updatedAt",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Pick<ItemBalance, "updatedAt"> {
    return { updatedAt: getCurrentDateTimeString() };
  }
  findById(
    id: number,
    fields?: ItemBalanceFields,
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
