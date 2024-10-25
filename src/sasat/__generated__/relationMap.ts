/* eslint-disable */
import {
  qe,
  BooleanValueExpression,
  RelationMap,
  TableInfo,
  EntityResult,
} from "sasat";
import { GQLContext } from "../context";
import { BalanceIdentifiable, Balance } from "./entities/Balance";
import { DebtIdentifiable, Debt } from "./entities/Debt";
import { ItemBalanceIdentifiable, ItemBalance } from "./entities/ItemBalance";
import {
  CompletedTaskUserIdentifiable,
  CompletedTaskUser,
} from "./entities/CompletedTaskUser";
import { User, UserIdentifiable } from "./entities/User";
import { Item, ItemIdentifiable } from "./entities/Item";
import { Currency, CurrencyIdentifiable } from "./entities/Currency";
import { LoginTaskIdentifiable, LoginTask } from "./entities/LoginTask";
import {
  DiscordPostTaskIdentifiable,
  DiscordPostTask,
} from "./entities/DiscordPostTask";
import {
  XRetweetTaskIdentifiable,
  XRetweetTask,
} from "./entities/XRetweetTask";
import { XLikeTaskIdentifiable, XLikeTask } from "./entities/XLikeTask";
import { RobTaskIdentifiable, RobTask } from "./entities/RobTask";
import { CrimeTaskIdentifiable, CrimeTask } from "./entities/CrimeTask";
import {
  TaskTargetRoleIdentifiable,
  TaskTargetRole,
} from "./entities/TaskTargetRole";
import { BonusIdentifiable, Bonus } from "./entities/Bonus";
import { TaskType, TaskTypeIdentifiable } from "./entities/TaskType";
import { MiniGame, MiniGameIdentifiable } from "./entities/MiniGame";
import { Season, SeasonIdentifiable } from "./entities/Season";
import {
  SeasonReservation,
  SeasonReservationIdentifiable,
} from "./entities/SeasonReservation";
import { SerialCode, SerialCodeIdentifiable } from "./entities/SerialCode";
import {
  SeasonStopReservation,
  SeasonStopReservationIdentifiable,
} from "./entities/SeasonStopReservation";
export const relationMap: RelationMap<GQLContext> = {
  user: {
    balance: {
      table: "balance",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "id"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: false,
      nullable: true,
      requiredColumns: [],
    },
    debt: {
      table: "debt",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "id"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: false,
      nullable: true,
      requiredColumns: [],
    },
    itemBalance: {
      table: "itemBalance",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "userId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    completedTaskUser: {
      table: "completedTaskUser",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "userId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
  },
  balance: {},
  debt: {},
  item: {
    itemBalance: {
      table: "itemBalance",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "itemId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
  },
  itemBalance: {},
  currency: {},
  taskType: {
    loginTask: {
      table: "loginTask",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    discordPostTask: {
      table: "discordPostTask",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    xRetweetTask: {
      table: "xRetweetTask",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    xLikeTask: {
      table: "xLikeTask",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    robTask: {
      table: "robTask",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    crimeTask: {
      table: "crimeTask",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    completedTaskUser: {
      table: "completedTaskUser",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    taskTargetRole: {
      table: "taskTargetRole",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
    bonus: {
      table: "bonus",
      condition: (arg): BooleanValueExpression => {
        return qe.and(
          qe.comparison(
            qe.field(arg.childTableAlias, "taskTypeId"),
            "=",
            arg.parentTableAlias
              ? qe.field(arg.parentTableAlias, "id")
              : qe.value(arg.parent?.id),
          ),
        );
      },
      array: true,
      nullable: false,
      requiredColumns: [],
    },
  },
  loginTask: {},
  discordPostTask: {},
  xRetweetTask: {},
  xLikeTask: {},
  robTask: {},
  crimeTask: {},
  completedTaskUser: {},
  taskTargetRole: {},
  bonus: {},
  miniGame: {},
  season: {},
  seasonReservation: {},
  serialCode: {},
  seasonStopReservation: {},
};
export const tableInfo: TableInfo = {
  user: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: { id: "id", createdAt: "createdAt" },
  },
  balance: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: { id: "id", balance: "balance", updatedAt: "updatedAt" },
  },
  debt: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      balance: "balance",
      updatedAt: "updatedAt",
      borrowed: "borrowed",
    },
  },
  item: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      name: "name",
      description: "description",
      status: "status",
      createdAt: "createdAt",
      price: "price",
      balance: "balance",
      image: "image",
      maxiumPerPesron: "maxiumPerPesron",
      reset: "reset",
    },
  },
  itemBalance: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      itemId: "itemId",
      userId: "userId",
      balance: "balance",
      updatedAt: "updatedAt",
    },
  },
  currency: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: { id: "id", symbol: "symbol", createdAt: "createdAt" },
  },
  taskType: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      type: "type",
      repetitive: "repetitive",
      reward: "reward",
      createdAt: "createdAt",
    },
  },
  loginTask: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      taskTypeId: "taskTypeId",
      duration: "duration",
      startAt: "startAt",
      endAt: "endAt",
      channelId: "channelId",
    },
  },
  discordPostTask: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      taskTypeId: "taskTypeId",
      includedString: "includedString",
      channelId: "channelId",
    },
  },
  xRetweetTask: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      taskTypeId: "taskTypeId",
      tweetId: "tweetId",
      deadline: "deadline",
    },
  },
  xLikeTask: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      taskTypeId: "taskTypeId",
      tweetId: "tweetId",
      deadline: "deadline",
    },
  },
  robTask: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      taskTypeId: "taskTypeId",
      duration: "duration",
      penalty: "penalty",
      winRate: "winRate",
      stolenRole: "stolenRole",
    },
  },
  crimeTask: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      taskTypeId: "taskTypeId",
      duration: "duration",
      penalty: "penalty",
      winRate: "winRate",
    },
  },
  completedTaskUser: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      taskTypeId: "taskTypeId",
      completedTaskId: "completedTaskId",
      userId: "userId",
      completedAt: "completedAt",
    },
  },
  taskTargetRole: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: { id: "id", taskTypeId: "taskTypeId", role: "role" },
  },
  bonus: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      taskTypeId: "taskTypeId",
      bonusTaskId: "bonusTaskId",
      amount: "amount",
      startAt: "startAt",
      endAt: "endAt",
    },
  },
  miniGame: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      name: "name",
      winRate: "winRate",
      maxDebt: "maxDebt",
      maxBet: "maxBet",
      minBet: "minBet",
    },
  },
  season: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      name: "name",
      startBalance: "startBalance",
      nextStartBalance: "nextStartBalance",
      duration: "duration",
      startAt: "startAt",
      endAt: "endAt",
      status: "status",
      createdAt: "createdAt",
    },
  },
  seasonReservation: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: { id: "id", startAt: "startAt", createdAt: "createdAt" },
  },
  serialCode: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: { id: "id", code: "code", createdAt: "createdAt" },
  },
  seasonStopReservation: {
    identifiableKeys: ["id"],
    identifiableFields: ["id"],
    columnMap: {
      id: "id",
      stopAt: "stopAt",
      updatedAt: "updatedAt",
      createdAt: "createdAt",
    },
  },
};
export type UserRelations = {
  balance: EntityResult<BalanceWithRelations, BalanceIdentifiable>;
  debt: EntityResult<DebtWithRelations, DebtIdentifiable>;
  itemBalance: Array<
    EntityResult<ItemBalanceWithRelations, ItemBalanceIdentifiable>
  >;
  completedTaskUser: Array<
    EntityResult<CompletedTaskUserWithRelations, CompletedTaskUserIdentifiable>
  >;
};
export type UserWithRelations = User & UserRelations;
export type UserResult = EntityResult<UserWithRelations, UserIdentifiable>;
export type BalanceRelations = Record<never, never>;
export type BalanceWithRelations = Balance & BalanceRelations;
export type BalanceResult = EntityResult<
  BalanceWithRelations,
  BalanceIdentifiable
>;
export type DebtRelations = Record<never, never>;
export type DebtWithRelations = Debt & DebtRelations;
export type DebtResult = EntityResult<DebtWithRelations, DebtIdentifiable>;
export type ItemRelations = {
  itemBalance: Array<
    EntityResult<ItemBalanceWithRelations, ItemBalanceIdentifiable>
  >;
};
export type ItemWithRelations = Item & ItemRelations;
export type ItemResult = EntityResult<ItemWithRelations, ItemIdentifiable>;
export type ItemBalanceRelations = Record<never, never>;
export type ItemBalanceWithRelations = ItemBalance & ItemBalanceRelations;
export type ItemBalanceResult = EntityResult<
  ItemBalanceWithRelations,
  ItemBalanceIdentifiable
>;
export type CurrencyRelations = Record<never, never>;
export type CurrencyWithRelations = Currency & CurrencyRelations;
export type CurrencyResult = EntityResult<
  CurrencyWithRelations,
  CurrencyIdentifiable
>;
export type TaskTypeRelations = {
  loginTask: Array<EntityResult<LoginTaskWithRelations, LoginTaskIdentifiable>>;
  discordPostTask: Array<
    EntityResult<DiscordPostTaskWithRelations, DiscordPostTaskIdentifiable>
  >;
  xRetweetTask: Array<
    EntityResult<XRetweetTaskWithRelations, XRetweetTaskIdentifiable>
  >;
  xLikeTask: Array<EntityResult<XLikeTaskWithRelations, XLikeTaskIdentifiable>>;
  robTask: Array<EntityResult<RobTaskWithRelations, RobTaskIdentifiable>>;
  crimeTask: Array<EntityResult<CrimeTaskWithRelations, CrimeTaskIdentifiable>>;
  completedTaskUser: Array<
    EntityResult<CompletedTaskUserWithRelations, CompletedTaskUserIdentifiable>
  >;
  taskTargetRole: Array<
    EntityResult<TaskTargetRoleWithRelations, TaskTargetRoleIdentifiable>
  >;
  bonus: Array<EntityResult<BonusWithRelations, BonusIdentifiable>>;
};
export type TaskTypeWithRelations = TaskType & TaskTypeRelations;
export type TaskTypeResult = EntityResult<
  TaskTypeWithRelations,
  TaskTypeIdentifiable
>;
export type LoginTaskRelations = Record<never, never>;
export type LoginTaskWithRelations = LoginTask & LoginTaskRelations;
export type LoginTaskResult = EntityResult<
  LoginTaskWithRelations,
  LoginTaskIdentifiable
>;
export type DiscordPostTaskRelations = Record<never, never>;
export type DiscordPostTaskWithRelations = DiscordPostTask &
  DiscordPostTaskRelations;
export type DiscordPostTaskResult = EntityResult<
  DiscordPostTaskWithRelations,
  DiscordPostTaskIdentifiable
>;
export type XRetweetTaskRelations = Record<never, never>;
export type XRetweetTaskWithRelations = XRetweetTask & XRetweetTaskRelations;
export type XRetweetTaskResult = EntityResult<
  XRetweetTaskWithRelations,
  XRetweetTaskIdentifiable
>;
export type XLikeTaskRelations = Record<never, never>;
export type XLikeTaskWithRelations = XLikeTask & XLikeTaskRelations;
export type XLikeTaskResult = EntityResult<
  XLikeTaskWithRelations,
  XLikeTaskIdentifiable
>;
export type RobTaskRelations = Record<never, never>;
export type RobTaskWithRelations = RobTask & RobTaskRelations;
export type RobTaskResult = EntityResult<
  RobTaskWithRelations,
  RobTaskIdentifiable
>;
export type CrimeTaskRelations = Record<never, never>;
export type CrimeTaskWithRelations = CrimeTask & CrimeTaskRelations;
export type CrimeTaskResult = EntityResult<
  CrimeTaskWithRelations,
  CrimeTaskIdentifiable
>;
export type CompletedTaskUserRelations = Record<never, never>;
export type CompletedTaskUserWithRelations = CompletedTaskUser &
  CompletedTaskUserRelations;
export type CompletedTaskUserResult = EntityResult<
  CompletedTaskUserWithRelations,
  CompletedTaskUserIdentifiable
>;
export type TaskTargetRoleRelations = Record<never, never>;
export type TaskTargetRoleWithRelations = TaskTargetRole &
  TaskTargetRoleRelations;
export type TaskTargetRoleResult = EntityResult<
  TaskTargetRoleWithRelations,
  TaskTargetRoleIdentifiable
>;
export type BonusRelations = Record<never, never>;
export type BonusWithRelations = Bonus & BonusRelations;
export type BonusResult = EntityResult<BonusWithRelations, BonusIdentifiable>;
export type MiniGameRelations = Record<never, never>;
export type MiniGameWithRelations = MiniGame & MiniGameRelations;
export type MiniGameResult = EntityResult<
  MiniGameWithRelations,
  MiniGameIdentifiable
>;
export type SeasonRelations = Record<never, never>;
export type SeasonWithRelations = Season & SeasonRelations;
export type SeasonResult = EntityResult<
  SeasonWithRelations,
  SeasonIdentifiable
>;
export type SeasonReservationRelations = Record<never, never>;
export type SeasonReservationWithRelations = SeasonReservation &
  SeasonReservationRelations;
export type SeasonReservationResult = EntityResult<
  SeasonReservationWithRelations,
  SeasonReservationIdentifiable
>;
export type SerialCodeRelations = Record<never, never>;
export type SerialCodeWithRelations = SerialCode & SerialCodeRelations;
export type SerialCodeResult = EntityResult<
  SerialCodeWithRelations,
  SerialCodeIdentifiable
>;
export type SeasonStopReservationRelations = Record<never, never>;
export type SeasonStopReservationWithRelations = SeasonStopReservation &
  SeasonStopReservationRelations;
export type SeasonStopReservationResult = EntityResult<
  SeasonStopReservationWithRelations,
  SeasonStopReservationIdentifiable
>;
