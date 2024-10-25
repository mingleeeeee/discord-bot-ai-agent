import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { getTaskTypeAll } from "../tools/taskTypeTools";
import { getLoginTask } from "../tools/loginTaskTools";
import { getPostTaskAll } from "../tools/discordPostTaskTools";
import { getRobTask } from "../tools/robTaskTools";
import { getCrimeTask } from "../tools/crimeTaskTools";
import { getXLikeTaskAll } from "../tools/xLikeTaskTools";
import { getXRetweetTaskAll } from "../tools/xRetweetTaskTools";
import { getTaskTargetRole } from "../tools/taskTargetRoleTools";
import { parseMsToDate, parseMsToTime } from "../tools/parseTime";
import { getBonusByTaskType } from "../tools/bonusTools";
import { localeMessages, localeCommand } from "../language";
import { getAllItem } from "../tools/itemTools";

const options = [
  { name: "login", value: 1 },
  { name: "discordPost", value: 2 },
  { name: "xRetweet", value: 3 },
  { name: "xLike", value: 4 },
  { name: "rob", value: 5 },
  { name: "crime", value: 6 },
];

const data = new SlashCommandBuilder()
  .setName("check-setting")
  .setDescription("check current setting")
  .setDescriptionLocalizations(localeCommand.checkSetting.comDes)
  .addSubcommand((subcommand) =>
    subcommand
      .setName("task-type")
      .setDescription("check task-type setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.taskTypeDes)
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("login-task")
      .setDescription("check login setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.loginTaskDes)
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("discord-post-task")
      .setDescription("check discord-post setting")
      .setDescriptionLocalizations(
        localeCommand.checkSetting.discordPostTaskDes
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("rob-task")
      .setDescription("check rob setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.robTaskDes)
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("crime-task")
      .setDescription("check crime setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.crimeTaskDes)
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("x-retweet-task")
      .setDescription("check x-retweet setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.xRetweetTaskDes)
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("x-like-task")
      .setDescription("check x-like setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.xLikeTaskDes)
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("task-target-role")
      .setDescription("check task-target-role setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.taskTargetRoleDes)
      .addIntegerOption((option) =>
        option
          .setName("tasktype")
          .setDescription("The task type")
          .setDescriptionLocalizations(
            localeCommand.checkSetting.taskTypeOptionDes
          )
          .setRequired(true)
          .addChoices(...options)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("bonus")
      .setDescription("check bonus setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.bonusDes)
      .addIntegerOption((option) =>
        option
          .setName("tasktype")
          .setDescription("The task type")
          .setDescriptionLocalizations(
            localeCommand.checkSetting.taskTypeOptionDes
          )
          .setRequired(true)
          .addChoices(...options)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("all-item")
      .setDescription("check all items setting")
      .setDescriptionLocalizations(localeCommand.checkSetting.itemDes)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  // Create a row of buttons
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("previous")
      .setLabel("<--")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("next")
      .setLabel("-->")
      .setStyle(ButtonStyle.Primary)
  );

  try {
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "task-type": {
        const res = (await getTaskTypeAll()) || [];

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noTaskType}`);

          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          break;
        }

        for (const task of res) {
          replyEmbed.addFields({
            name: `${task.type}\n`,
            value: `${translate.taskTypeInfo
              .replace("{id}", task.id.toString())
              .replace("{repetitive}", task.repetitive?.toString() || "")
              .replace("{reward}", task.reward?.toString() || "")}`,

            inline: false,
          });
        }

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        break;
      }

      case "login-task": {
        const res = (await getLoginTask()) || [];

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noLoginTask}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          break;
        }

        const client = interaction.client;
        for (const task of res) {
          const channelId = task.channelId || "";
          const channelName = client.channels.cache.get(channelId);

          const parsedDuration = parseMsToTime(Number(task.duration));
          const parsedStartAt = parseMsToDate(Number(task.startAt));
          const parsedEndAt = parseMsToDate(Number(task.endAt));
          // the date need to be parsed to readable string?
          replyEmbed.addFields({
            name: `login task\n`,
            value: `${translate.loginTaskInfo
              .replace("{id}", task.id.toString())
              .replace("{taskTypeId}", task.taskTypeId?.toString() || "")
              .replace("{parsedDuration}", parsedDuration)
              .replace("{parsedStartAt}", parsedStartAt)
              .replace("{parsedEndAt}", parsedEndAt)
              .replace("{channelName}", channelName?.toString() || "")}`,
            inline: false,
          });
        }

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        break;
      }
      case "discord-post-task": {
        const res = (await getPostTaskAll()) || [];

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noDcPostTask}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          break;
        }

        const genDcTaskEmbed = (pageIndex: number) => {
          const newEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTimestamp()
            .setDescription("Discord post tasks");

          const client = interaction.client;

          for (let i = 0; i < 25; i++) {
            const task = res[pageIndex * 25 + i];
            if (!task) break;

            const channelId = task.channelId || "";
            const channelName = client.channels.cache.get(channelId);

            newEmbed.addFields({
              name: `**> Id:${task.id} ** \n`,
              value: `${translate.dcPostTaskInfo.replace("{channelName}", channelName?.toString() || "").replace("{includedString}", task.includedString || "")}`,
              inline: false,
            });
          }

          return newEmbed;
        };

        const message = await interaction.reply({
          embeds: [genDcTaskEmbed(0)],
          components: [row],
          ephemeral: true,
          fetchReply: true,
        });

        // Create a collector to listen for button clicks
        const collector = message.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 300000, // 5 minutes
        });

        let pageIndex = 0;
        collector.on("collect", async (i) => {
          if (i.customId === "previous") {
            pageIndex = Math.max(pageIndex - 1, 0);
          } else if (i.customId === "next") {
            pageIndex = Math.min(pageIndex + 1, Math.ceil(res.length / 25) - 1);
          }

          // Update the message with the new embed
          await i.update({ embeds: [genDcTaskEmbed(pageIndex)] });
        });

        // can not edit the ephemeral message, just delete it
        collector.on("end", async (collected, reason) => {
          try {
            if (reason === "time") {
              await interaction.deleteReply();
            }
          } catch (error) {
            console.error("Failed to delete message: ", error);
          }
        });

        break;
      }

      case "rob-task": {
        const res = (await getRobTask()) || [];

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noRobTaskFound}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          break;
        }

        for (const task of res) {
          const parsedDuration = parseMsToTime(Number(task.duration));
          replyEmbed.addFields({
            name: `rob task\n`,
            value: `${translate.robTaskInfo
              .replace("{id}", task.id.toString())
              .replace("{parsedDuration}", parsedDuration)
              .replace("{penalty}", task.penalty?.toString() || "")
              .replace("{winRate}", task.winRate?.toString() || "")
              .replace("{roleName}", task.stolenRole || "")}`,

            inline: false,
          });
        }
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        break;
      }

      case "crime-task": {
        const res = (await getCrimeTask()) || [];

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noCrimeTaskFound}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          break;
        }

        for (const task of res) {
          const parsedDuration = parseMsToTime(Number(task.duration));

          replyEmbed.addFields({
            name: `crime task\n`,
            value: `${translate.crimeTaskInfo
              .replace("{id}", task.id.toString())
              .replace("{parsedDuration}", parsedDuration)
              .replace("{penalty}", task.penalty?.toString() || "")
              .replace("{winRate}", task.winRate?.toString() || "")}`,
            inline: false,
          });
        }
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        break;
      }

      // deadline is in ms
      case "x-retweet-task": {
        const res = (await getXRetweetTaskAll()) || [];

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noXRetweetTask}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          break;
        }

        replyEmbed.setDescription(`${translate.showUnexpiredXRetweetTask}`);

        const genRetweetTaskEmbed = (pageIndex: number) => {
          const newEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTimestamp()
            .setDescription(`${translate.showUnexpiredXRetweetTask}`);

          for (let i = 0; i < 25; i++) {
            const task = res[pageIndex * 25 + i];
            if (!task) break;

            const now = Date.now();
            // if the deadline is not passed, show the task
            if (now <= Number(task.deadline)) {
              const parsedDeadline = parseMsToDate(Number(task.deadline));
              newEmbed.addFields({
                name: `**> task id:${task.id} ** \n`,
                value: `${translate.xRetweetTaskInfo.replace("{tweetId}", task.tweetId?.toString() || "").replace("{parsedDeadline}", parsedDeadline)}`,
                inline: false,
              });
            }
          }

          return newEmbed;
        };

        const message = await interaction.reply({
          embeds: [genRetweetTaskEmbed(0)],
          components: [row],
          ephemeral: true,
          fetchReply: true,
        });

        // Create a collector to listen for button clicks
        const collector = message.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 300000, // 5 minutes
        });

        let pageIndex = 0;
        collector.on("collect", async (i) => {
          if (i.customId === "previous") {
            pageIndex = Math.max(pageIndex - 1, 0);
          } else if (i.customId === "next") {
            pageIndex = Math.min(pageIndex + 1, Math.ceil(res.length / 25) - 1);
          }

          // Update the message with the new embed
          await i.update({ embeds: [genRetweetTaskEmbed(pageIndex)] });
        });

        // can not edit the ephemeral message, just delete it
        collector.on("end", async (collected, reason) => {
          try {
            if (reason === "time") {
              await interaction.deleteReply();
            }
          } catch (error) {
            console.error("Failed to delete message: ", error);
          }
        });

        break;
      }

      // deadline is in ms
      case "x-like-task": {
        const res = (await getXLikeTaskAll()) || [];

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noXLikeTask}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          break;
        }

        replyEmbed.setDescription(`${translate.showUnexpiredXLikeTask}`);

        const genLikeTaskEmbed = (pageIndex: number) => {
          const newEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTimestamp()
            .setDescription(`${translate.showUnexpiredXLikeTask}`);

          for (let i = 0; i < 25; i++) {
            const task = res[pageIndex * 25 + i];
            if (!task) break;

            const now = Date.now();

            // if the deadline is not passed, show the task
            if (now <= Number(task.deadline)) {
              const parsedDeadline = parseMsToDate(Number(task.deadline));
              newEmbed.addFields({
                name: `**> task id:${task.id} ** \n`,
                value: `${translate.xLikeTaskInfo.replace("{tweetId}", task.tweetId?.toString() || "").replace("{parsedDeadline}", parsedDeadline)}`,
                inline: false,
              });
            }
          }

          return newEmbed;
        };

        const message = await interaction.reply({
          embeds: [genLikeTaskEmbed(0)],
          components: [row],
          ephemeral: true,
          fetchReply: true,
        });

        // Create a collector to listen for button clicks
        const collector = message.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 300000, // 5 minutes
        });

        let pageIndex = 0;
        collector.on("collect", async (i) => {
          if (i.customId === "previous") {
            pageIndex = Math.max(pageIndex - 1, 0);
          } else if (i.customId === "next") {
            pageIndex = Math.min(pageIndex + 1, Math.ceil(res.length / 25) - 1);
          }

          // Update the message with the new embed
          await i.update({ embeds: [genLikeTaskEmbed(pageIndex)] });
        });

        // can not edit the ephemeral message, just delete it
        collector.on("end", async (collected, reason) => {
          try {
            if (reason === "time") {
              await interaction.deleteReply();
            }
          } catch (error) {
            console.error("Failed to delete message: ", error);
          }
        });

        break;
      }

      case "task-target-role": {
        const taskType = Number(interaction.options.getInteger("tasktype"));
        const res = (await getTaskTargetRole(taskType)) || [];

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noTaskTargetRole}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          break;
        }

        const genTaskRoleEmbed = (pageIndex: number) => {
          const newEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTimestamp()
            .setDescription("Task target roles");

          for (let i = 0; i < 25; i++) {
            const target = res[pageIndex * 25 + i];
            if (!target) break;

            newEmbed.addFields({
              name: `**> Id:${target.id} ** \n`,
              value: `${translate.taskTargetRoleInfo.replace("{role}", target.role || "")}`,

              inline: false,
            });
          }

          return newEmbed;
        };

        const message = await interaction.reply({
          embeds: [genTaskRoleEmbed(0)],
          components: [row],
          ephemeral: true,
          fetchReply: true,
        });

        // Create a collector to listen for button clicks
        const collector = message.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 300000, // 5 minutes
        });

        let pageIndex = 0;
        collector.on("collect", async (i) => {
          if (i.customId === "previous") {
            pageIndex = Math.max(pageIndex - 1, 0);
          } else if (i.customId === "next") {
            pageIndex = Math.min(pageIndex + 1, Math.ceil(res.length / 25) - 1);
          }

          // Update the message with the new embed
          await i.update({ embeds: [genTaskRoleEmbed(pageIndex)] });
        });

        // can not edit the ephemeral message, just delete it
        collector.on("end", async (collected, reason) => {
          try {
            if (reason === "time") {
              await interaction.deleteReply();
            }
          } catch (error) {
            console.error("Failed to delete message: ", error);
          }
        });

        break;
      }

      case "bonus": {
        const taskType = Number(interaction.options.getInteger("tasktype"));
        const res = (await getBonusByTaskType(taskType)) || [];
        const taskTypeOpt = options.find((opt) => opt.value === taskType);

        if (!res.length) {
          replyEmbed.setTitle(`${translate.noBonusFound}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          break;
        }

        const genBonusEmbed = (pageIndex: number) => {
          const newEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTimestamp()
            .setDescription(
              `Bonus setting for task type: ${taskTypeOpt?.name}`
            );

          for (let i = 0; i < 25; i++) {
            const target = res[pageIndex * 25 + i];
            if (!target) break;

            const parsedStartAt = parseMsToDate(Number(target.startAt));
            const parsedEndAt = parseMsToDate(Number(target.endAt));
            newEmbed.addFields({
              name: `**> tsak id:${target.id} ** \n`,
              value: `${translate.bonusInfo
                .replace("{amount}", target.amount?.toString() || "")
                .replace("{parsedStartAt}", parsedStartAt)
                .replace("{parsedEndAt}", parsedEndAt)} `,

              inline: false,
            });
          }

          return newEmbed;
        };

        const message = await interaction.reply({
          embeds: [genBonusEmbed(0)],
          components: [row],
          ephemeral: true,
          fetchReply: true,
        });

        // Create a collector to listen for button clicks
        const collector = message.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 300000, // 5 minutes
        });

        let pageIndex = 0;
        collector.on("collect", async (i) => {
          if (i.customId === "previous") {
            pageIndex = Math.max(pageIndex - 1, 0);
          } else if (i.customId === "next") {
            pageIndex = Math.min(pageIndex + 1, Math.ceil(res.length / 25) - 1);
          }

          // Update the message with the new embed
          await i.update({ embeds: [genBonusEmbed(pageIndex)] });
        });

        // can not edit the ephemeral message, just delete it
        collector.on("end", async (collected, reason) => {
          try {
            if (reason === "time") {
              await interaction.deleteReply();
            }
          } catch (error) {
            console.error("Failed to delete message: ", error);
          }
        });

        break;
      }

      case "all-item": {
        const allItems = (await getAllItem()) || [];

        if (!allItems.length) {
          replyEmbed.setTitle(`${translate.noItem}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        }

        const genItemEmbed = (pageIndex: number) => {
          const newEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTimestamp()
            .setDescription(`Items`);

          for (let i = 0; i < 25; i++) {
            const item = allItems[pageIndex * 25 + i];
            if (!item) break;

            let description = item.description || "";
            if (description.length > 150) {
              description = description.substring(0, 150) + "...";
            }

            newEmbed.addFields({
              name: `${item.name}`,
              value: translate.checkItemInfo
                .replace("{price}", Number(item.price).toString())
                .replace("{balance}", Number(item.balance).toString())
                .replace(
                  "{maxiumPerPesron}",
                  Number(item.maxiumPerPesron).toString()
                )
                .replace("{description}", description)
                .replace("{status}", item.status || "")
                .replace("{reset}", item.reset || ""),
              inline: false,
            });
          }

          return newEmbed;
        };
        // Send the embed with the buttons
        const message = await interaction.reply({
          embeds: [genItemEmbed(0)],
          components: [row],
          ephemeral: true,
          fetchReply: true,
        });

        // Create a collector to listen for button clicks
        const collector = message.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 300000, // 5 minutes
        });

        let pageIndex = 0;
        collector.on("collect", async (i) => {
          if (i.customId === "previous") {
            pageIndex = Math.max(pageIndex - 1, 0);
          } else if (i.customId === "next") {
            pageIndex = Math.min(
              pageIndex + 1,
              Math.ceil(allItems.length / 25) - 1
            );
          }

          // Update the message with the new embed
          await i.update({ embeds: [genItemEmbed(pageIndex)] });
        });

        // can not edit the ephemeral message, just delete it
        collector.on("end", async (collected, reason) => {
          try {
            if (reason === "time") {
              await interaction.deleteReply();
            }
          } catch (error) {
            console.error("Failed to delete message: ", error);
          }
        });

        break;
      }

      default: {
        replyEmbed.setTitle(`${translate.invalidCommand}`);
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        break;
      }
    }

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

export const checkSettingCommand = {
  data,
  execute,
};
