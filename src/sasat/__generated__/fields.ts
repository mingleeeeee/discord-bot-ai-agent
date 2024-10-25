/* eslint-disable */
import { User } from "./entities/User";
import { Fields } from "sasat";
import { Balance } from "./entities/Balance";
import { Debt } from "./entities/Debt";
import { Item } from "./entities/Item";
import { ItemBalance } from "./entities/ItemBalance";
import { Currency } from "./entities/Currency";
import { TaskType } from "./entities/TaskType";
import { LoginTask } from "./entities/LoginTask";
import { DiscordPostTask } from "./entities/DiscordPostTask";
import { XRetweetTask } from "./entities/XRetweetTask";
import { XLikeTask } from "./entities/XLikeTask";
import { RobTask } from "./entities/RobTask";
import { CrimeTask } from "./entities/CrimeTask";
import { CompletedTaskUser } from "./entities/CompletedTaskUser";
import { TaskTargetRole } from "./entities/TaskTargetRole";
import { Bonus } from "./entities/Bonus";
import { MiniGame } from "./entities/MiniGame";
import { Season } from "./entities/Season";
import { SeasonReservation } from "./entities/SeasonReservation";
import { SerialCode } from "./entities/SerialCode";
import { SeasonStopReservation } from "./entities/SeasonStopReservation";
export type UserFields = Fields<
  User,
  {
    balance?: BalanceFields;
    debt?: DebtFields;
    itemBalance?: ItemBalanceFields;
    completedTaskUser?: CompletedTaskUserFields;
  }
>;
export type BalanceFields = Fields<Balance, {}>;
export type DebtFields = Fields<Debt, {}>;
export type ItemFields = Fields<Item, { itemBalance?: ItemBalanceFields }>;
export type ItemBalanceFields = Fields<ItemBalance, {}>;
export type CurrencyFields = Fields<Currency, {}>;
export type TaskTypeFields = Fields<
  TaskType,
  {
    loginTask?: LoginTaskFields;
    discordPostTask?: DiscordPostTaskFields;
    xRetweetTask?: XRetweetTaskFields;
    xLikeTask?: XLikeTaskFields;
    robTask?: RobTaskFields;
    crimeTask?: CrimeTaskFields;
    completedTaskUser?: CompletedTaskUserFields;
    taskTargetRole?: TaskTargetRoleFields;
    bonus?: BonusFields;
  }
>;
export type LoginTaskFields = Fields<LoginTask, {}>;
export type DiscordPostTaskFields = Fields<DiscordPostTask, {}>;
export type XRetweetTaskFields = Fields<XRetweetTask, {}>;
export type XLikeTaskFields = Fields<XLikeTask, {}>;
export type RobTaskFields = Fields<RobTask, {}>;
export type CrimeTaskFields = Fields<CrimeTask, {}>;
export type CompletedTaskUserFields = Fields<CompletedTaskUser, {}>;
export type TaskTargetRoleFields = Fields<TaskTargetRole, {}>;
export type BonusFields = Fields<Bonus, {}>;
export type MiniGameFields = Fields<MiniGame, {}>;
export type SeasonFields = Fields<Season, {}>;
export type SeasonReservationFields = Fields<SeasonReservation, {}>;
export type SerialCodeFields = Fields<SerialCode, {}>;
export type SeasonStopReservationFields = Fields<SeasonStopReservation, {}>;
