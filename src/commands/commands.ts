import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { createTaskCommand } from "@/commands/admin/createTask";
import { editTaskCommand } from "@/commands/admin/editTask";
import { editTaskTypeCommand } from "@/commands/admin/editTaskType";
import { addTaskRoleCommand } from "@/commands/admin/addTaskRole";
import { removeTaskRoleCommand } from "@/commands/admin/removeTaskRole";
import { deleteItemCommand } from "@/commands/admin/deleteItem";
import { editItemCommand } from "@/commands/admin/editItem";
import { createItemCommand } from "@/commands/admin/createItem";
import { setBonusCommand } from "@/commands/admin/setBonus";
import { addMoneyRoleCommand } from "./admin/addMoneyRole";
import { removeMoneyRoleCommand } from "./admin/removeMoneyRole";
import { balanceCommand } from "./user/balance";
import { buyItemCommand } from "./user/buyItem";
import { itemInfoCommand } from "./user/itemInfo";
import { itemStoreCommand } from "./user/itemStore";
import { dailyLoginCommand } from "./user/dailyLogin";
import { robCommand } from "./user/rob";
import { crimeCommand } from "./user/crime";
import { blackjackCommand } from "./user/blackjack";
import { checkSettingCommand } from "./admin/checkSetting";
import { removeMoneyCommand } from "./admin/removeMoney";
import { addMoneyCommand } from "./admin/addMoney";
import { connectXCommand } from "./user/connectX";
import { slotCommand } from "./user/slot";
import { rouletteCommand } from "./user/roulette";
import { setSlotCommand } from "./admin/setSlot";
import { checkSeasonCommand } from "./user/checkSeason";
import { setStartBalanceCommand } from "./admin/setStartBalance";
import { startSeasonCommand } from "./admin/startSeason";
import { borrowMoneyCommand } from "./user/borrowMoney";
import { checkUserCommand } from "./admin/checkUser";
import { editBonusCommand } from "./admin/editBonus";
import { checkStatsCommand } from "./admin/checkStats";
import { receiveCodeCommand } from "./user/receiveCode";
import { checkSerialCodeCommand } from "./admin/checkSerialCode";
import { addMoneyItemCommand } from "./admin/addMoneyItem";
import { stopSeasonCommand } from "./admin/stopSeason";
import { askAibotCommand } from "./user/ask-aibot";

export type Command = (
  interaction: ChatInputCommandInteraction
) => Promise<void>;

export const commands: {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;
  execute: Command;
}[] = [
  createTaskCommand,
  editTaskCommand,
  editTaskTypeCommand,
  addTaskRoleCommand,
  removeTaskRoleCommand,
  deleteItemCommand,
  editItemCommand,
  createItemCommand,
  setBonusCommand,
  addMoneyRoleCommand,
  removeMoneyRoleCommand,
  balanceCommand,
  buyItemCommand,
  itemInfoCommand,
  itemStoreCommand,
  dailyLoginCommand,
  robCommand,
  crimeCommand,
  blackjackCommand,
  checkSettingCommand,
  removeMoneyCommand,
  addMoneyCommand,
  connectXCommand,
  slotCommand,
  rouletteCommand,
  setSlotCommand,
  checkSeasonCommand,
  setStartBalanceCommand,
  startSeasonCommand,
  borrowMoneyCommand,
  checkUserCommand,
  editBonusCommand,
  checkStatsCommand,
  receiveCodeCommand,
  checkSerialCodeCommand,
  addMoneyItemCommand,
  stopSeasonCommand,
  askAibotCommand
];
