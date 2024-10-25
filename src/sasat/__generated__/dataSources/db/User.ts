/* eslint-disable */
import { UserWithRelations } from "../../relationMap";
import {
  UserIdentifiable,
  User,
  UserCreatable,
  UserUpdatable,
} from "../../entities/User";
import { UserFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { getCurrentDateTimeString, QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<UserWithRelations> & UserIdentifiable;
export abstract class GeneratedUserDBDataSource extends BaseDBDataSource<
  User,
  UserIdentifiable,
  UserCreatable,
  UserUpdatable,
  UserFields,
  QueryResult
> {
  readonly tableName: string = "user";
  readonly fields: Array<string> = ["id", "createdAt"];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = undefined;
  protected getDefaultValueString(): Pick<User, "createdAt"> {
    return { createdAt: getCurrentDateTimeString() };
  }
  findById(
    id: string,
    fields?: UserFields,
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
