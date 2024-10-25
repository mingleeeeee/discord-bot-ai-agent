import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { getTweetIdFromUrl } from "@/commands/tools/getTweeterId";
import toMilliseconds from "@sindresorhus/to-milliseconds";
import parseMilliseconds from "parse-ms";
import { LoginTaskDBDataSource } from "@/sasat/dataSources/db/LoginTask";
import { QExpr } from "sasat";
import { getTotalMsWithDefault, jstToUtc0 } from "../tools/parseTime";
import { DiscordPostTaskDBDataSource } from "@/sasat/dataSources/db/DiscordPostTask";
import {
  checkTaskTargetRole,
  createTaskTargetRole,
} from "../tools/taskTargetRoleTools";
import { RobTaskDBDataSource } from "@/sasat/dataSources/db/RobTask";
import { CrimeTaskDBDataSource } from "@/sasat/dataSources/db/CrimeTask";
import {
  checkXRetweetTaskByTweetId,
  createXRetweetTaskAndPost,
} from "../tools/xRetweetTaskTools";
import {
  checkXLikeTaskByTweetId,
  createXLikeTaskAndPost,
} from "../tools/xLikeTaskTools";
import moment from "moment";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("create-task")
  .setDescription("create a task")
  .setDescriptionLocalizations(localeCommand.createTask.comDes)
  .addSubcommand((subcommand) =>
    subcommand
      .setName("login")
      .setDescription("create login task")
      .setDescriptionLocalizations(
        localeCommand.createTask.subCommands.login.subDes
      )
      .addIntegerOption((option) =>
        option
          .setName("duration")
          .setDescription("The task duration (days)")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.login.durationDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addStringOption((option) =>
        option
          .setName("startdate")
          .setDescription("set start date in YYYY-MM-DD hh:mm:ss JST format")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.login.startdateDes
          )
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("enddate")
          .setDescription("set end date in YYYY-MM-DD hh:mm:ss JST format")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.login.enddateDes
          )
          .setRequired(true)
      )
      .addRoleOption((option) =>
        option
          .setName("role")
          .setDescription("The task target role")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.login.roleDes
          )
          .setRequired(true)
      )
      .addChannelOption((option) =>
        option
          .setName("channel")
          .setDescription("The task target channel")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.login.channelDes
          )
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("discord-post")
      .setDescription("create discord post task")
      .setDescriptionLocalizations(
        localeCommand.createTask.subCommands.discordPost.subDes
      )
      .addStringOption((option) =>
        option
          .setName("includedstring")
          .setDescription("The check string included in the post")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.discordPost.includedstringDes
          )
          .setRequired(true)
      )
      .addRoleOption((option) =>
        option
          .setName("role")
          .setDescription("The task target role")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.discordPost.roleDes
          )
          .setRequired(true)
      )
      .addChannelOption((option) =>
        option
          .setName("channel")
          .setDescription("The task channel")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.discordPost.channelDes
          )
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("x-retweet")
      .setDescription("create x-retweet task")
      .setDescriptionLocalizations(
        localeCommand.createTask.subCommands.xRetweet.subDes
      )
      .addStringOption((option) =>
        option
          .setName("tweeturl")
          .setDescription("The tweet to retweet")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xRetweet.tweeturlDes
          )
          .setRequired(true)
      )
      .addRoleOption((option) =>
        option
          .setName("role")
          .setDescription("The task target role")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xRetweet.roleDes
          )
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("day")
          .setDescription("The days to expire")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xRetweet.dayDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("hour")
          .setDescription("The hours to expire")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xRetweet.hourDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("minute")
          .setDescription("The minute to expire")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xRetweet.minuteDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("second")
          .setDescription("The seconds to expire")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xRetweet.secondDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("x-like")
      .setDescription("create x-like task")
      .setDescriptionLocalizations(
        localeCommand.createTask.subCommands.xLike.subDes
      )
      .addStringOption((option) =>
        option
          .setName("tweeturl")
          .setDescription("The tweet to retweet")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xLike.tweeturlDes
          )
          .setRequired(true)
      )
      .addRoleOption((option) =>
        option
          .setName("role")
          .setDescription("The task target role")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xLike.roleDes
          )
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("day")
          .setDescription("The days to expire")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xLike.dayDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("hour")
          .setDescription("The hours to expire")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xLike.hourDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("minute")
          .setDescription("The minute to expire")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xLike.minuteDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("second")
          .setDescription("The seconds to expire")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.xLike.secondDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("rob")
      .setDescription("create rob task")
      .setDescriptionLocalizations(
        localeCommand.createTask.subCommands.rob.subDes
      )
      .addIntegerOption((option) =>
        option
          .setName("duration")
          .setDescription("The task duration (days)")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.rob.durationDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("penalty")
          .setDescription("The rob penalty")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.rob.penaltyDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("winrate")
          .setDescription("The rob winrate")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.rob.winrateDes
          )
          .setRequired(true)
          .setMinValue(0)
          .setMaxValue(100)
      )
      .addRoleOption((option) =>
        option
          .setName("role")
          .setDescription("role to stolen")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.rob.roleDes
          )
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("crime")
      .setDescription("create crime task")
      .setDescriptionLocalizations(
        localeCommand.createTask.subCommands.crime.subDes
      )
      .addIntegerOption((option) =>
        option
          .setName("duration")
          .setDescription("The task duration (days)")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.crime.durationDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("penalty")
          .setDescription("The crime penalty")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.crime.penaltyDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("winrate")
          .setDescription("The crime winrate")
          .setDescriptionLocalizations(
            localeCommand.createTask.subCommands.crime.winrateDes
          )
          .setRequired(true)
          .setMinValue(0)
          .setMaxValue(100)
      )
  );

// https://x.com/TOKYOBEAST_EN/status/1749350518122766733?s=20
// http://localhost:3400/redirect?url=https%3A%2F%2Ftwitter.com%2Fintent%2Fretweet%3Ftweet_id%3D1749350518122766733
const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  try {
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "login": {
        const loginTaskDb = new LoginTaskDBDataSource();
        const getLoginTask = await loginTaskDb.find(
          { fields: ["id"] },
          { lock: "FOR UPDATE" }
        );

        // if there is login task, return
        if (getLoginTask.length) {
          replyEmbed.setTitle(`${translate.loginTaskExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        const getDuration = Number(interaction.options.getInteger("duration"));
        const getStartDate = jstToUtc0(
          interaction.options.getString("startdate") || ""
        );
        const getEndDate = jstToUtc0(
          interaction.options.getString("enddate") || ""
        );
        const getTargetChannel = interaction.options.getChannel("channel");
        const getTargetRole = interaction.options.getRole("role");

        const startDateTest = moment(getStartDate, "YYYY-MM-DD HH:mm:ss", true);
        const endDateTest = moment(getEndDate, "YYYY-MM-DD HH:mm:ss", true);

        // check if the duration is valid format
        if (!startDateTest.isValid() || !endDateTest.isValid()) {
          replyEmbed.setTitle(`${translate.notValidDate}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }
        // check if the duration is valid format
        // if (!isValidDate(getStartDate) || !isValidDate(getEndDate)) {
        //   replyEmbed.setTitle(`Please input a valid date as YYYY-MM-DD.`);
        //   await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        //   return;
        // }

        // parse time to milliseconds
        const durationToMs = toMilliseconds({
          days: getDuration,
        });

        const startDatetoMs = new Date(getStartDate).getTime();
        const endDatetoMs = new Date(getEndDate).getTime();
        // const startDatetoMs = Date.parse(getStartDate);
        // const endDatetoMs = Date.parse(getEndDate);

        await loginTaskDb.create({
          taskTypeId: 1,
          duration: durationToMs.toString(),
          startAt: startDatetoMs.toString(),
          endAt: endDatetoMs.toString(),
          channelId: getTargetChannel?.id || "",
        });

        // set default role
        // check if the task target role is in the table, if exist, return
        if (await checkTaskTargetRole(1, getTargetRole?.name || "")) {
          replyEmbed.setTitle(
            `${translate.createdLoginTask
              .replace("{getDuration}", getDuration.toString())
              .replace("{getStartDate}", getStartDate)
              .replace("{getEndDate}", getEndDate)
              .replace("{channelName}", getTargetChannel?.name || "")
              .replace("{roleName}", getTargetRole?.name || "")}`
          );
          await interaction.reply({ embeds: [replyEmbed] });
          return;
        }

        // if not exist, create it
        await createTaskTargetRole(1, getTargetRole?.name || "");

        replyEmbed.setTitle(
          `${translate.createdLoginTaskWithRole
            .replace("{getDuration}", getDuration.toString())
            .replace("{getStartDate}", getStartDate)
            .replace("{getEndDate}", getEndDate)
            .replace("{channelName}", getTargetChannel?.name || "")
            .replace("{roleName}", getTargetRole?.name || "")}`
        );
        break;
      }

      case "discord-post": {
        const getTargetChannel = interaction.options.getChannel("channel");
        const getTargetRole = interaction.options.getRole("role");
        const includedString = interaction.options.getString("includedstring");

        const discordPostTaskDb = new DiscordPostTaskDBDataSource();

        const getDiscordPostTask = await discordPostTaskDb.find(
          { fields: ["id", "includedString", "channelId"] },
          {
            lock: "FOR UPDATE",
            where: QExpr.conditions.and(
              QExpr.conditions.eq(
                QExpr.field("t0", "includedString"),
                QExpr.value(includedString)
              ),
              QExpr.conditions.eq(
                QExpr.field("t0", "channelId"),
                QExpr.value(getTargetChannel?.id || "")
              )
            ),
          }
        );

        // if there is discord post task (with same includedString and channelId), return
        if (getDiscordPostTask.length) {
          replyEmbed.setTitle(`${translate.discordPostTaskExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        await discordPostTaskDb.create({
          taskTypeId: 2,
          includedString: includedString || "",
          channelId: getTargetChannel?.id || "",
        });

        // set default role
        // check if the task target role is in the table, if exist, return
        if (await checkTaskTargetRole(2, getTargetRole?.name || "")) {
          replyEmbed.setTitle(
            `${translate.createDCPostTask
              .replace("{includedString}", includedString?.toString() || "")
              .replace("{channelName}", getTargetChannel?.name || "")
              .replace("{roleName}", getTargetRole?.name || "")}`
          );
          await interaction.reply({ embeds: [replyEmbed] });
          return;
        }

        // if not exist, create it
        await createTaskTargetRole(2, getTargetRole?.name || "");
        replyEmbed.setTitle(
          `${translate.createDCPostTaskWithRole
            .replace("{includedString}", includedString?.toString() || "")
            .replace("{channelName}", getTargetChannel?.name || "")
            .replace("{roleName}", getTargetRole?.name || "")}`
        );
        break;
      }

      case "x-retweet": {
        const getTweetUrl = interaction.options.getString("tweeturl") || "";
        const getTargetRole = interaction.options.getRole("role");
        const getDay = Number(interaction.options.getInteger("day"));
        const getHour = Number(interaction.options.getInteger("hour"));
        const getMin = Number(interaction.options.getInteger("minute"));
        const getSec = Number(interaction.options.getInteger("second"));
        const now = Date.now();

        //if no input, default expire time is 24 hours
        const totalMs = getTotalMsWithDefault(getDay, getHour, getMin, getSec);

        const deadlineMs = now + totalMs;
        const tweetId = getTweetIdFromUrl(getTweetUrl);
        const countDown = parseMilliseconds(totalMs);

        // const xRetweetTaskDb = new XRetweetTaskDBDataSource();

        // check if the tweet exist in the retweet table
        if (await checkXRetweetTaskByTweetId(tweetId)) {
          replyEmbed.setTitle(`${translate.xRetweetTaskExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        // if not exist, create it
        await createXRetweetTaskAndPost(
          tweetId,
          deadlineMs,
          interaction,
          countDown,
          getTweetUrl
        );

        // set default role
        // check if the task target role is in the table, if exist, return
        if (await checkTaskTargetRole(3, getTargetRole?.name || "")) {
          replyEmbed.setTitle(
            `${translate.createXRetweetTask
              .replace("{getTweetUrl}", getTweetUrl)
              .replace("{days}", countDown.days.toString())
              .replace("{hours}", countDown.hours.toString())
              .replace("{minutes}", countDown.minutes.toString())
              .replace("{seconds}", countDown.seconds.toString())
              .replace("{roleName}", getTargetRole?.name || "")}`
          );
          await interaction.reply({ embeds: [replyEmbed] });
          return;
        }

        // if not exist, create it
        await createTaskTargetRole(3, getTargetRole?.name || "");

        replyEmbed.setTitle(
          `${translate.createXRetweetTaskWithRole
            .replace("{getTweetUrl}", getTweetUrl)
            .replace("{days}", countDown.days.toString())
            .replace("{hours}", countDown.hours.toString())
            .replace("{minutes}", countDown.minutes.toString())
            .replace("{seconds}", countDown.seconds.toString())
            .replace("{roleName}", getTargetRole?.name || "")}`
        );

        break;
      }
      case "x-like": {
        const getTweetUrl = interaction.options.getString("tweeturl") || "";
        const getTargetRole = interaction.options.getRole("role");
        const getDay = Number(interaction.options.getInteger("day"));
        const getHour = Number(interaction.options.getInteger("hour"));
        const getMin = Number(interaction.options.getInteger("minute"));
        const getSec = Number(interaction.options.getInteger("second"));
        const now = Date.now();

        //if no input, default expire time is 24 hours
        const totalMs = getTotalMsWithDefault(getDay, getHour, getMin, getSec);
        // set expire time.  set it to 24 hours

        const deadlineMs = now + totalMs;
        const tweetId = getTweetIdFromUrl(getTweetUrl);
        const countDown = parseMilliseconds(totalMs);

        // check if the tweet exist in the like task table
        if (await checkXLikeTaskByTweetId(tweetId)) {
          replyEmbed.setTitle(`${translate.xLikeTaskExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        // if not exist, create it
        await createXLikeTaskAndPost(
          tweetId,
          deadlineMs,
          interaction,
          countDown,
          getTweetUrl
        );

        // set default role
        // check if the task target role is in the table, if exist, return
        if (await checkTaskTargetRole(4, getTargetRole?.name || "")) {
          replyEmbed.setTitle(
            `${translate.createXLikeTask
              .replace("{getTweetUrl}", getTweetUrl)
              .replace("{days}", countDown.days.toString())
              .replace("{hours}", countDown.hours.toString())
              .replace("{minutes}", countDown.minutes.toString())
              .replace("{seconds}", countDown.seconds.toString())
              .replace("{roleName}", getTargetRole?.name || "")}`
          );

          await interaction.reply({ embeds: [replyEmbed] });
          return;
        }

        // if not exist, create it
        await createTaskTargetRole(4, getTargetRole?.name || "");

        replyEmbed.setTitle(
          `${translate.createXLikeTaskWithRole
            .replace("{getTweetUrl}", getTweetUrl)
            .replace("{days}", countDown.days.toString())
            .replace("{hours}", countDown.hours.toString())
            .replace("{minutes}", countDown.minutes.toString())
            .replace("{seconds}", countDown.seconds.toString())
            .replace("{roleName}", getTargetRole?.name || "")}`
        );

        break;
      }
      case "rob": {
        //get the value from interaction
        const getDuration = Number(interaction.options.getInteger("duration"));
        const getPenalty = Number(interaction.options.getInteger("penalty"));
        const getWinRate = Number(interaction.options.getInteger("winrate"));
        const getTargetRole = interaction.options.getRole("role")?.name || "";

        const robTaskDb = new RobTaskDBDataSource();
        const getRobTask = await robTaskDb.find(
          { fields: ["id"] },
          { lock: "FOR UPDATE" }
        );

        //check if the rob task already exist, if exist, return
        if (getRobTask.length) {
          replyEmbed.setTitle(`${translate.robTaskExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        // parse time to milliseconds
        const durationToMs = toMilliseconds({
          days: getDuration,
        });

        //if not exist, create it
        await robTaskDb.create({
          taskTypeId: 5,
          duration: durationToMs.toString(),
          penalty: getPenalty,
          winRate: getWinRate,
          stolenRole: getTargetRole,
        });

        replyEmbed.setTitle(
          `${translate.createRobTask.replace("{getDuration}", getDuration.toString()).replace("{getPenalty}", getPenalty.toString()).replace("{getWinRate}", getWinRate.toString()).replace("{roleName}", getTargetRole.toString())}  `
        );

        break;
      }
      case "crime": {
        //get the value from interaction
        const getDuration = Number(interaction.options.getInteger("duration"));
        const getPenalty = Number(interaction.options.getInteger("penalty"));
        const getWinRate = Number(interaction.options.getInteger("winrate"));

        const crimeTaskDb = new CrimeTaskDBDataSource();
        const getCrimeTask = await crimeTaskDb.find(
          { fields: ["id"] },
          { lock: "FOR UPDATE" }
        );

        //check if the rob task already exist, if exist, return
        if (getCrimeTask.length) {
          replyEmbed.setTitle(`${translate.crimeTaskExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        // parse time to milliseconds
        const durationToMs = toMilliseconds({
          days: getDuration,
        });

        //if not exist, create it
        await crimeTaskDb.create({
          taskTypeId: 6,
          duration: durationToMs.toString(),
          penalty: getPenalty,
          winRate: getWinRate,
        });

        replyEmbed.setTitle(
          `${translate.createCrimeTask.replace("{getDuration}", getDuration.toString()).replace("{getPenalty}", getPenalty.toString()).replace("{getWinRate}", getWinRate.toString())}`
        );

        break;
      }

      default: {
        replyEmbed.setTitle(`${translate.inValidSubcommand}`);
        break;
      }
    }

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

export const createTaskCommand = {
  data,
  execute,
};
