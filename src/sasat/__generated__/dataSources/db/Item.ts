/* eslint-disable */
import { ItemWithRelations } from "../../relationMap";
import {
  ItemIdentifiable,
  Item,
  ItemCreatable,
  ItemUpdatable,
} from "../../entities/Item";
import { ItemFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<ItemWithRelations> & ItemIdentifiable;
export abstract class GeneratedItemDBDataSource extends BaseDBDataSource<
  Item,
  ItemIdentifiable,
  ItemCreatable,
  ItemUpdatable,
  ItemFields,
  QueryResult
> {
  readonly tableName: string = "item";
  readonly fields: Array<string> = [
    "id",
    "name",
    "description",
    "status",
    "createdAt",
    "price",
    "balance",
    "image",
    "maxiumPerPesron",
    "reset",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Pick<Item, "createdAt"> {
    return { createdAt: getCurrentDateTimeString() };
  }
  findById(
    id: number,
    fields?: ItemFields,
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
