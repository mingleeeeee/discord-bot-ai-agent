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
import { XRetweetTaskDBDataSource } from "@/sasat/dataSources/db/XRetweetTask";
import { XLikeTaskDBDataSource } from "@/sasat/dataSources/db/XLikeTask";
import { RobTaskDBDataSource } from "@/sasat/dataSources/db/RobTask";
import { CrimeTaskDBDataSource } from "@/sasat/dataSources/db/CrimeTask";
import moment from "moment";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("edit-task")
  .setDescription("edit a task")
  .setDescriptionLocalizations(localeCommand.editTask.comDes)
  .addSubcommand((subcommand) =>
    subcommand
      .setName("login")
      .setDescription("edit login task")
      .setDescriptionLocalizations(
        localeCommand.editTask.subCommands.login.subDes
      )
      .addIntegerOption((option) =>
        option
          .setName("duration")
          .setDescription("new task duration (days)")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.login.durationDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addStringOption((option) =>
        option
          .setName("startdate")
          .setDescription("set start date in YYYY-MM-DD hh:mm:ss JST format")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.login.startdateDes
          )
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("enddate")
          .setDescription("set end date in YYYY-MM-DD hh:mm:ss JST format")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.login.enddateDes
          )
          .setRequired(true)
      )
      .addChannelOption((option) =>
        option
          .setName("channel")
          .setDescription("new task target channel")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.login.channelDes
          )
          .setRequired(true)
      )
  )

  .addSubcommand((subcommand) =>
    subcommand
      .setName("discord-post")
      .setDescription("edit discord post task string")
      .setDescriptionLocalizations(
        localeCommand.editTask.subCommands.discordPost.subDes
      )
      .addStringOption((option) =>
        option
          .setName("oldstring")
          .setDescription("The old string included in the post")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.discordPost.oldstringDes
          )
          .setRequired(true)
      )
      .addChannelOption((option) =>
        option
          .setName("oldchannel")
          .setDescription("The old target channel")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.discordPost.oldchannelDes
          )
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("newstring")
          .setDescription("The new string included in the post")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.discordPost.newstringDes
          )
          .setRequired(true)
      )
      .addChannelOption((option) =>
        option
          .setName("newchannel")
          .setDescription("The new target channel")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.discordPost.newchannelDes
          )
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("x-retweet")
      .setDescription("edit deadline of x-retweet task")
      .setDescriptionLocalizations(
        localeCommand.editTask.subCommands.xRetweet.subDes
      )
      .addStringOption((option) =>
        option
          .setName("tweeturl")
          .setDescription("The edit target tweet")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xRetweet.tweeturlDes
          )
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("day")
          .setDescription("The days to expire")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xRetweet.dayDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("hour")
          .setDescription("The hours to expire")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xRetweet.hourDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("minute")
          .setDescription("The minute to expire")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xRetweet.minuteDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("second")
          .setDescription("The seconds to expire")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xRetweet.secondDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("x-like")
      .setDescription("edit deadline of x-like task")
      .setDescriptionLocalizations(
        localeCommand.editTask.subCommands.xLike.subDes
      )
      .addStringOption((option) =>
        option
          .setName("tweeturl")
          .setDescription("edit target tweet")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xLike.tweeturlDes
          )
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("day")
          .setDescription("new days to expire")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xLike.dayDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("hour")
          .setDescription("new hours to expire")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xLike.hourDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("minute")
          .setDescription("new minutes to expire")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xLike.minuteDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("second")
          .setDescription("new seconds to expire")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.xLike.secondDes
          )
          .setRequired(false)
          .setMinValue(0)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("rob")
      .setDescription("edit rob task")
      .setDescriptionLocalizations(
        localeCommand.editTask.subCommands.rob.subDes
      )
      .addIntegerOption((option) =>
        option
          .setName("duration")
          .setDescription("new task duration (days)")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.rob.durationDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("penalty")
          .setDescription("new rob penalty")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.rob.penaltyDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("winrate")
          .setDescription("new rob winrate")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.rob.winrateDes
          )
          .setRequired(true)
          .setMinValue(0)
          .setMaxValue(100)
      )
      .addRoleOption((option) =>
        option
          .setName("role")
          .setDescription("new role to stolen")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.rob.roleDes
          )
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("crime")
      .setDescription("edit crime task")
      .setDescriptionLocalizations(
        localeCommand.editTask.subCommands.crime.subDes
      )
      .addIntegerOption((option) =>
        option
          .setName("duration")
          .setDescription("new task duration (days)")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.crime.durationDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("penalty")
          .setDescription("new crime penalty")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.crime.penaltyDes
          )
          .setRequired(true)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("winrate")
          .setDescription("new crime winrate")
          .setDescriptionLocalizations(
            localeCommand.editTask.subCommands.crime.winrateDes
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
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("The Post")
    .setTimestamp();

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

        // if there is no login task, return
        if (!getLoginTask.length) {
          replyEmbed.setTitle(`${translate.loginTaskNotExisted}`);
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

        // parse duration to milliseconds
        const durationToMs = toMilliseconds({
          days: getDuration,
        });
        // const startDatetoMs = Date.parse(getStartDate);
        // const endDatetoMs = Date.parse(getEndDate);
        const startDatetoMs = new Date(getStartDate).getTime();
        const endDatetoMs = new Date(getEndDate).getTime();

        await loginTaskDb.update({
          id: getLoginTask[0].id,
          duration: durationToMs.toString(),
          startAt: startDatetoMs.toString(),
          endAt: endDatetoMs.toString(),
          channelId: getTargetChannel?.id || "",
        });

        replyEmbed.setTitle(
          `${translate.editLoginTask
            .replace("{getDuration}", getDuration.toString())
            .replace("{getStartDate}", getStartDate)
            .replace("{getEndDate}", getEndDate)
            .replace("{channelName}", getTargetChannel?.name || "")}`
        );
        break;
      }

      case "discord-post": {
        const oldString = interaction.options.getString("oldstring");
        const oldChannel = interaction.options.getChannel("oldchannel");
        const newString = interaction.options.getString("newstring");
        const newChannel = interaction.options.getChannel("newchannel");

        const discordPostTaskDb = new DiscordPostTaskDBDataSource();
        const getDiscordPostTask = await discordPostTaskDb.find(
          { fields: ["id", "includedString", "channelId"] },
          {
            lock: "FOR UPDATE",
            where: QExpr.conditions.and(
              QExpr.conditions.eq(
                QExpr.field("t0", "includedString"),
                QExpr.value(oldString)
              ),
              QExpr.conditions.eq(
                QExpr.field("t0", "channelId"),
                QExpr.value(oldChannel?.id || "")
              )
            ),
          }
        );

        // if there is no discord post task (with same includedString and channelId), return
        if (!getDiscordPostTask.length) {
          replyEmbed.setTitle(`${translate.dcPostTaskNotExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        await discordPostTaskDb.update({
          id: getDiscordPostTask[0].id,
          includedString: newString || "",
          channelId: newChannel?.id || "",
        });

        replyEmbed.setTitle(
          `${translate.editDCPostTask.replace("{includedString}", newString?.toString() || "").replace("{channelName}", newChannel?.name || "")}`
        );
        break;
      }

      case "x-retweet": {
        const getTweetUrl = interaction.options.getString("tweeturl") || "";
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

        // check if the tweet not exist in the retweet table
        const xRetweetTaskDb = new XRetweetTaskDBDataSource();
        const getRetweetTaskByTweetId = await xRetweetTaskDb.find(
          { fields: ["id", "tweetId", "deadline"] },
          {
            lock: "FOR UPDATE",
            where: QExpr.conditions.eq(
              QExpr.field("t0", "tweetId"),
              QExpr.value(tweetId)
            ),
          }
        );

        if (!getRetweetTaskByTweetId.length) {
          replyEmbed.setTitle(
            `${translate.tweetNotExisted.replace("{getTweetUrl}", getTweetUrl)}`
          );
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        // if exist, update it's deadline
        await xRetweetTaskDb.update({
          id: getRetweetTaskByTweetId[0].id,
          deadline: deadlineMs.toString(),
        });

        replyEmbed.setTitle(
          `${translate.editXRetweetTask.replace("{getTweetUrl}", getTweetUrl).replace("{days}", countDown.days.toString()).replace("{hours}", countDown.hours.toString()).replace("{minutes}", countDown.minutes.toString()).replace("{seconds}", countDown.seconds.toString())}`
        );

        break;
      }
      case "x-like": {
        const getTweetUrl = interaction.options.getString("tweeturl") || "";
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

        // check if the tweet exist in the retweet table
        const xLikeTaskDb = new XLikeTaskDBDataSource();
        const getLikeTaskByTweetId = await xLikeTaskDb.find(
          { fields: ["id", "tweetId", "deadline"] },
          {
            lock: "FOR UPDATE",
            where: QExpr.conditions.eq(
              QExpr.field("t0", "tweetId"),
              QExpr.value(tweetId)
            ),
          }
        );

        // if not exist, return
        if (!getLikeTaskByTweetId.length) {
          replyEmbed.setTitle(
            `${translate.tweetNotExisted.replace("{getTweetUrl}", getTweetUrl)}`
          );
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        // if exist, update it's deadline
        await xLikeTaskDb.update({
          id: getLikeTaskByTweetId[0].id,
          deadline: deadlineMs.toString(),
        });

        replyEmbed.setTitle(
          `${translate.editXLikeTask.replace("{getTweetUrl}", getTweetUrl).replace("{days}", countDown.days.toString()).replace("{hours}", countDown.hours.toString()).replace("{minutes}", countDown.minutes.toString()).replace("{seconds}", countDown.seconds.toString())}`
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

        //check if the rob task not exist, return
        if (!getRobTask.length) {
          replyEmbed.setTitle(`${translate.robTaskNotExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        // parse time to milliseconds
        const durationToMs = toMilliseconds({
          days: getDuration,
        });

        //if exist, update it
        await robTaskDb.update({
          id: getRobTask[0].id,
          duration: durationToMs.toString(),
          penalty: getPenalty,
          winRate: getWinRate,
          stolenRole: getTargetRole,
        });

        replyEmbed.setTitle(
          `${translate.editRobTask.replace("{getDuration}", getDuration.toString()).replace("{getPenalty}", getPenalty.toString()).replace("{getWinRate}", getWinRate.toString()).replace("{roleName}", getTargetRole.toString())}`
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

        //check if the rob task not exist, return
        if (!getCrimeTask.length) {
          replyEmbed.setTitle(`${translate.crimeTaskNotExisted}`);
          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
          return;
        }

        // parse time to milliseconds
        const durationToMs = toMilliseconds({
          days: getDuration,
        });

        //if exist, update it
        await crimeTaskDb.update({
          id: getCrimeTask[0].id,
          duration: durationToMs.toString(),
          penalty: getPenalty,
          winRate: getWinRate,
        });

        replyEmbed.setTitle(
          `${translate.editCrimeTask.replace("{getDuration}", getDuration.toString()).replace("{getPenalty}", getPenalty.toString()).replace("{getWinRate}", getWinRate.toString())}`
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

export const editTaskCommand = {
  data,
  execute,
};
