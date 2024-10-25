import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { jstToUtc0 } from "../tools/parseTime";
import { BonusDBDataSource } from "@/sasat/dataSources/db/Bonus";
import { QExpr } from "sasat";
import { getTaskTypeByType } from "../tools/taskTypeTools";
import { localeCommand, localeMessages } from "../language";
import moment from "moment";

const options = [
  { name: "login", value: "login" },
  { name: "discordPost", value: "discordPost" },
  { name: "xRetweet", value: "xRetweet" },
  { name: "xLike", value: "xLike" },
  { name: "rob", value: "rob" },
  { name: "crime", value: "crime" },
];

const data = new SlashCommandBuilder()
  .setName("edit-bonus")
  .setDescription("set bonus to a specific task")
  .setDescriptionLocalizations(localeCommand.editBonus.comDes)
  .addStringOption((option) =>
    option
      .setName("tasktype")
      .setDescription("task type name")
      .setDescriptionLocalizations(localeCommand.editBonus.taskTypeDes)
      .setRequired(true)
      .addChoices(...options)
  )
  .addIntegerOption((option) =>
    option
      .setName("taskid")
      .setDescription("the task id of a specific task")
      .setDescriptionLocalizations(localeCommand.editBonus.taskIdDes)
      .setRequired(true)
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("bonus amount")
      .setDescriptionLocalizations(localeCommand.editBonus.amountDes)
      .setRequired(true)
      .setMinValue(0)
  )
  .addStringOption((option) =>
    option
      .setName("startat")
      .setDescription("YYYY-MM-DD JST")
      .setDescriptionLocalizations(localeCommand.editBonus.startAtDes)
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("endat")
      .setDescription("YYYY-MM-DD JST")
      .setDescriptionLocalizations(localeCommand.editBonus.endAtDes)
      .setRequired(true)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();
  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    // check the startat and endat format
    const getTaskType = interaction.options.getString("tasktype") || "";
    const getTaskId = Number(interaction.options.getInteger("taskid"));
    const getAmount = Number(interaction.options.getInteger("amount"));
    const getStartAt = jstToUtc0(
      interaction.options.getString("startat") || ""
    );
    const getEndAt = jstToUtc0(interaction.options.getString("endat") || "");

    const startDateTest = moment(getStartAt, "YYYY-MM-DD HH:mm:ss", true);
    const endDateTest = moment(getEndAt, "YYYY-MM-DD HH:mm:ss", true);

    // check if the duration is valid format
    if (!startDateTest.isValid() || !endDateTest.isValid()) {
      replyEmbed.setTitle(`${translate.notValidDate}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // check if the duration is valid format
    // if (!isValidDate(getStartAt) || !isValidDate(getEndAt)) {
    //   replyEmbed.setTitle(`${translate.invalidBonusDate}`);
    //   await interaction.reply({ embeds: [replyEmbed] });
    //   return;
    // }

    // check if the taskType is in the taskType table
    const getTaskTypeData = (await getTaskTypeByType(getTaskType)) || [];
    if (!getTaskTypeData.length) {
      replyEmbed.setTitle(
        `${translate.taskTypeNotInTaskTypeTable.replace("{getTaskType}", getTaskType)}`
      );
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const bonusDb = new BonusDBDataSource();
    const getBonusByTaskTypeAndTaskId = await bonusDb.find(
      {
        fields: [
          "id",
          "taskTypeId",
          "bonusTaskId",
          "amount",
          "startAt",
          "endAt",
        ],
      },
      {
        lock: "FOR UPDATE",
        where: QExpr.conditions.and(
          QExpr.conditions.eq(
            QExpr.field("t0", "taskTypeId"),
            QExpr.value(getTaskTypeData[0].id)
          ),
          QExpr.conditions.eq(
            QExpr.field("t0", "bonusTaskId"),
            QExpr.value(getTaskId)
          )
        ),
      }
    );

    const startDatetoMs = Date.parse(getStartAt);
    const endDatetoMs = Date.parse(getEndAt);

    // check if the tasktype with taskid is not in the table, create it
    if (!getBonusByTaskTypeAndTaskId.length) {
      replyEmbed.setTitle(
        `${translate.noBonusTask.replace("{getTaskType}", getTaskType).replace("{getTaskId}", getTaskId.toString())}`
      );
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

      return;
    }

    // if in the table, update it
    await bonusDb.update({
      id: getBonusByTaskTypeAndTaskId[0].id,
      amount: getAmount,
      startAt: startDatetoMs.toString(),
      endAt: endDatetoMs.toString(),
    });
    replyEmbed.setTitle(
      `${translate.bonusUpdate.replace("{getTaskType}", getTaskType).replace("{getTaskId}", getTaskId.toString())}`
    );

    await interaction.reply({ embeds: [replyEmbed] });
    return;
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: translate.somethingWrong,
      ephemeral: true,
    });
    return;
  }
};

export const editBonusCommand = {
  data,
  execute,
};
