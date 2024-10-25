/* eslint-disable */
import { DiscordPostTaskWithRelations } from "../../relationMap";
import {
  DiscordPostTaskIdentifiable,
  DiscordPostTask,
  DiscordPostTaskCreatable,
  DiscordPostTaskUpdatable,
} from "../../entities/DiscordPostTask";
import { DiscordPostTaskFields } from "../../fields";
import { BaseDBDataSource } from "../../../baseDBDataSource";
import { QueryOptions, qe } from "sasat";
import { GQLContext } from "../../../context";
type QueryResult = Partial<DiscordPostTaskWithRelations> &
  DiscordPostTaskIdentifiable;
export abstract class GeneratedDiscordPostTaskDBDataSource extends BaseDBDataSource<
  DiscordPostTask,
  DiscordPostTaskIdentifiable,
  DiscordPostTaskCreatable,
  DiscordPostTaskUpdatable,
  DiscordPostTaskFields,
  QueryResult
> {
  readonly tableName: string = "discordPostTask";
  readonly fields: Array<string> = [
    "id",
    "taskTypeId",
    "includedString",
    "channelId",
  ];
  protected readonly primaryKeys: Array<string> = ["id"];
  protected readonly identifyFields: Array<string> = ["id"];
  protected readonly autoIncrementColumn?: string | undefined = "id";
  protected getDefaultValueString(): Partial<DiscordPostTask> {
    return {};
  }
  findById(
    id: number,
    fields?: DiscordPostTaskFields,
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
