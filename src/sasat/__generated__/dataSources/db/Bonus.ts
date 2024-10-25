/* eslint-disable */
import { BonusWithRelations } from "../../relationMap";
import {
  BonusIdentifiable,
  Bonus,
  BonusCreatable,
  BonusUpdatable,
} from "../../entities/Bonus";
import { BonusFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<BonusWithRelations> & BonusIdentifiable;
export abstract class GeneratedBonusDBDataSource extends BaseDBDataSource<
  Bonus,
  BonusIdentifiable,
  BonusCreatable,
  BonusUpdatable,
  BonusFields,
  QueryResult
> {
  readonly tableName: string = "bonus";
  readonly fields: Array<string> = [
    "id",
    "taskTypeId",
    "bonusTaskId",
    "amount",
    "startAt",
    "endAt",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<Bonus> {
    return {};
  }
  findById(
    id: number,
    fields?: BonusFields,
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
