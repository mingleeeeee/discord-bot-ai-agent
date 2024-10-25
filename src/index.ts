import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Collection,
  ComponentType,
  EmbedBuilder,
  GatewayIntentBits,
} from "discord.js";
import { Command, commands } from "@/commands/commands";
import { updateMoney } from "@/commands/tools/updateMoney";
import express, { Request, Response } from "express";
import {
  checkXRetweetTaskByTweetId,
  getXRetweetTaskByTweetId,
  getXRetweetTaskDeadline,
} from "./commands/tools/xRetweetTaskTools";
import {
  checkXLikeTaskByTweetId,
  getXLikeTaskByTweetId,
  getXLikeTaskDeadline,
} from "./commands/tools/xLikeTaskTools";
import {
  checkCompletedTask,
  createCompletedTask,
  getCompletedTask,
  updateCompletedTask,
} from "./commands/tools/completedTaskUserTools";
import { finalBonusAmount } from "./commands/tools/bonusTools";
import { getTaskTypeByType } from "./commands/tools/taskTypeTools";
import { checkUser } from "./commands/tools/userTools";
import { checkAdmin, checkUserRoles } from "./commands/tools/checkRole";
import { getPostTask } from "./commands/tools/discordPostTaskTools";
import { getTaskTargetRole } from "./commands/tools/taskTargetRoleTools";
import parseMilliseconds from "parse-ms";
import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import session from "express-session";
import cookieParser from "cookie-parser";
import {
  createNextSeason,
  endSeasonSettlement,
  getLatestSeason,
  updateCurrentSeasonEndAt,
} from "./commands/tools/seasonTools";
import moment from "moment";
import {
  getFirstReservation,
  storeReservation,
} from "./commands/tools/reservationTools";
import { getListedItem } from "./commands/tools/itemTools";
import { localeMessages } from "./commands/language";
// import axios from "axios";
import { jstToUtc0 } from "./commands/tools/parseTime";
import { DynamoDBClient, PutItemCommand,GetItemCommand } from "@aws-sdk/client-dynamodb";
import { translateMessage } from "./translateService"; // You will need to implement this function using GPT

console.log("aaa");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////// Message Translation Part Implemented by Ming  //////////////////////////////////////////////////////////////////////
// Handle messages, buttons and DB operation 
client.on("messageCreate", async (message) => {
  console.log("Received message in channel:", message.channel.id); // Debugging log
  console.log("Expected channel:", process.env.ANNOUNCEMENT_CHANNEL_ID); // Debugging log

  // Check if the message is from a bot
  if (message.author.bot) return; // Exit if the message is from a bot

  // Check if the message is in the correct channel
  if (message.channel.id !== process.env.ANNOUNCEMENT_CHANNEL_ID) {
    console.log("Message is not in the announcement channel."); // Log message if not in the correct channel
    return; // Exit if not in the target channel
  }

  const supportedLanguages = [
    { code: "zh", name: "中文" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "hi", name: "हिन्दी" },
    { code: "it", name: "Italiano" },
    { code: "ar", name: "العربية" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "es", name: "Español" },
  ];
   // Store translations in the database
   const dbClient = new DynamoDBClient({ region: "ap-northeast-1" });

   try {
    const translations: { [key: string]: string } = {};
     for (const lang of supportedLanguages) {
       const translatedText = await translateMessage(message.content, lang.code); // Translate function
       translations[lang.code] = translatedText;
       const params = {
        TableName: "TranslatedMessages",
        Item: {
          MessageID: { S: message.id },
          Translations: { 
            M: Object.fromEntries(
              Object.entries(translations).map(([key, value]) => [key, { S: value }])
            )
          }, // Store all translations in the map
          OriginalMessage: { S: message.content },
        },
      };
 
       await dbClient.send(new PutItemCommand(params)); // Save translation to DynamoDB
       console.log(`Translation saved for ${lang.code}: "${translatedText}"`); // Log success
     }
   
  // Add translation buttons to the message
  const buttonRows = supportedLanguages.map(lang => 
    new ButtonBuilder()
      .setCustomId(`translate-${lang.code}-${message.id}`)
      .setLabel(lang.name)
      .setStyle(ButtonStyle.Secondary)
  );

  // Split buttons into rows (max 5 per row)
  const components = [];
  for (let i = 0; i < buttonRows.length; i += 5) {
    components.push(new ActionRowBuilder<ButtonBuilder>().addComponents(buttonRows.slice(i, i + 5)));
  }

  // Reply with the Translate buttons
  await message.reply({
    content: "Select a language to translate the message:",
    components: components,
  });

} catch (error) {
  console.error("Error:", error); // Log any errors
}
});

// Handle button interaction for translation buttons
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return; // Exit if interaction is not a button

  const customId = interaction.customId;
  if (!customId.startsWith("translate-")) return; // Only handle translation buttons

  const [_, langCode, messageId] = customId.split("-"); // Extract language code and message ID

  // Defer the reply to prevent interaction timeout
  // if (!interaction.replied) {
  //   await interaction.deferReply({ ephemeral: true });
  // }
  // Dynamodb client
  const dbClient = new DynamoDBClient({ region: "ap-northeast-1" });
  const params = {
    TableName: "TranslatedMessages",
    Key: {
      MessageID: { S: messageId }, // Replace messageId with the ID of the message you want to fetch
    },
  };

  try {
    const result = await dbClient.send(new GetItemCommand(params)); // Retrieve the item from the database
  
    if (result.Item) {
      // Successfully fetched item
      const item = result.Item;
      if (item.Translations && item.Translations.M) {
        const translations = item.Translations.M; // Assuming Translations is stored as a map
        console.log("Fetched translations:", translations);
     
        const translationForLang = translations[langCode]?.S; // Get translation for the specific language code
        if (translationForLang) {
          console.log(`Database - ${langCode}:`, translationForLang);

          
          await interaction.reply({
            content: translationForLang, // Display the translation
            ephemeral: true
          });
          // Respond with the fetched translation
          // await interaction.editReply({
          //   content: translationForLang, // Display the translation
          // });
          
        } else {
          console.log("Translation not found for this language.");
          await interaction.reply({ content: "Translation not found for this language." ,ephemeral: true});
          
        }
      } else {
        console.log("No translations found.");
        await interaction.reply({ content: "No translations found.",ephemeral: true });
      }
    } else {
      console.log("Item not found in the database.");
      await interaction.reply({ content: "Message not found in database." ,ephemeral: true});
    }
  } catch (error) {
    console.error("Error fetching translation:", error);
    await interaction.reply({ content: "Error occurred while fetching the translation.",ephemeral: true });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// https://discord.js.org/#/docs/discord.js/main/general/welcome
client.on("ready", async () => {
  // client.user?.setAvatar("./public/tokyobeast-avatar.png");
  // client.user?.setUsername("TokyoBeast-Bot");
  // console.log(`Bot is ready. Application ID is ${client.user?.id}`);
  console.log(`Logged in as ${client.user?.tag}!`);

  async function reconnectSeason() {
    const getCurrentSeasonRes = (await getLatestSeason()) || [];
    if (!getCurrentSeasonRes.length) {
      return console.log("There is no season data.");
    }

    const seasonEndAt = Number(getCurrentSeasonRes[0].endAt);
    const seasonStatus = getCurrentSeasonRes[0].status;

    if (seasonStatus !== "active") {
      return console.log("The season is not active.");
    }

    if (seasonEndAt <= Date.now()) {
      await endSeasonHandler();
      return console.log("The season was expired. Call endSeasonHandler.");
    }

    // set the season timeout
    const remainingTime = seasonEndAt - Date.now();
    console.log("Continue the season interval. Remaining Time:", remainingTime);
    seasonTimeout = setTimeout(endSeasonHandler, remainingTime);
  }

  // season reservation check when restart the bot
  const getReservationData = (await getFirstReservation()) || [];

  if (
    getReservationData.length > 0 &&
    Number(getReservationData[0].startAt) > Date.now()
  ) {
    // has reservation
    console.log("There is a reservation:", getReservationData[0].startAt);
    const remainingTime = Number(getReservationData[0].startAt) - Date.now();
    startReservationTimeout = setTimeout(async () => {
      await createNextSeason();
      await reconnectSeason();
    }, remainingTime);
  } else {
    // no reservation
    console.log("There is no reservation. Check the season timeout.");
    await reconnectSeason();
  }
});

client.login(process.env.DISCORD_TOKEN).then((it) => {
  console.log(it);
});

const commandList = new Collection<string, Command>();
commands.forEach((it) => {
  commandList.set(it.data.name, it.execute);
});

// daily stamp task
client.on("messageCreate", async (message) => {
  try {
    // if the message is from a bot
    if (message.author.bot) {
      return;
    }

    // check user roles
    const userRoleName = message.member?.roles.cache.map((role) => role.name);
    const getTargetRoleData = (await getTaskTargetRole(2)) || [];
    const targetRoleNames = getTargetRoleData.map((i) => i.role);

    if (!userRoleName?.some((role) => targetRoleNames.includes(role))) {
      return;
    }

    // check if the current channel & specific string is recorded in discord post task table
    const userId = message.author.id;
    const messageContent = message.content;
    // const messageContentStrings = message.content.split(" ");
    const channelId = message.channel.id;
    const res = (await getPostTask(messageContent, channelId)) || [];

    if (!res.length) {
      console.log(
        "There is no daily stamp task with this string in this channel."
      );
      return;
    }

    // get the stamp task data
    const { id: stampTaskId, taskTypeId: stampTaskTypeId } = res[0];

    // check if the user has already completed this task

    const now = Date.now();

    const getPostTaskTypeData = (await getTaskTypeByType("discordPost")) || [];
    if (!getPostTaskTypeData.length) {
      console.log("There is no discord post task type data.");
      return;
    }

    const { reward } = getPostTaskTypeData[0];

    const getCompletedTaskData =
      (await getCompletedTask(Number(stampTaskTypeId), stampTaskId, userId)) ||
      [];

    const bonus =
      (await finalBonusAmount(Number(stampTaskTypeId), stampTaskId)) || 0;

    // if there is no user's completed task data of discordPost, create it
    if (!getCompletedTaskData.length) {
      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);

      await createCompletedTask(Number(stampTaskTypeId), stampTaskId, userId);

      await message.reply(
        `Completed daily stamp task. Add ${reward} to your balance.` +
          (bonus > 0 ? ` Bonus: ${bonus}` : "")
      );
      return;
    }

    const { id: completedTaskId, completedAt } = getCompletedTaskData[0];
    const oneDay = 1000 * 60 * 60 * 24;
    // if the user has already completed the task, check the duration
    // check if the user has already logged in the duration
    if (getCompletedTaskData.length && now - Number(completedAt) < oneDay) {
      const nextTask = parseMilliseconds(oneDay - (now - Number(completedAt)));
      console.log(
        `Next stamp task time: ${nextTask.hours}h ${nextTask.minutes}m ${nextTask.seconds}s.`
      );
      return;
    }

    if (getCompletedTaskData.length && now - Number(completedAt) > oneDay) {
      await updateCompletedTask(completedTaskId, {
        completedAt: Date.now().toString(),
      });
      const totalReward = Number(reward) + bonus;
      await updateMoney(userId, totalReward);
      await message.reply(
        `Completed daily stamp task. Add ${reward} to your balance.` +
          (bonus > 0 ? ` Bonus: ${bonus}` : "")
      );
      return;
    }
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.guildId !== process.env.GUILD_ID) {
    console.log(interaction.guildId);
    return;
  }
  if (!interaction.isChatInputCommand()) return;

  const command = commandList.get(interaction.commandName);

  if (!command) {
    console.error(`command ${interaction.commandName} NOT FOUND`);
    return;
  }

  try {
    await command(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Internal server error",
      ephemeral: true,
    });
  }
});

// buy-item isAutocomplete interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isAutocomplete()) return;

  if (interaction.commandName !== "buy-item") return;

  const getItemData = (await getListedItem()) || [];
  const itemChoices = getItemData.map((item) => {
    return {
      name: item.name || "",
      value: item.name || "",
    };
  });

  //get the focused value
  const focusedValue = interaction.options.getFocused();

  const filteredChoices = itemChoices.filter((itemChoices) =>
    itemChoices.name.toLowerCase().startsWith(focusedValue.toLowerCase())
  );

  const results = filteredChoices.map((choice) => {
    return {
      name: choice.name,
      value: choice.value,
    };
  });

  interaction.respond(results.slice(0, 25)).catch((error) => {
    console.error(error);
  });
});

// roulette isAutocomplete interaction
client.on("interactionCreate", async (interaction) => {
  const betChoices = [
    { name: "red", value: "red" },
    { name: "black", value: "black" },
    { name: "even", value: "even" },
    { name: "odd", value: "odd" },
    { name: "1st", value: "1st" },
    { name: "2nd", value: "2nd" },
    { name: "3rd", value: "3rd" },
    { name: "1-18", value: "1-18" },
    { name: "19-36", value: "19-36" },
    { name: "1-12", value: "1-12" },
    { name: "13-24", value: "13-24" },
    { name: "25-36", value: "25-36" },
    // { name: "0", value: "0" },
    // { name: "1", value: "1" },
    // { name: "2", value: "2" },
    // { name: "3", value: "3" },
    // { name: "4", value: "4" },
    // { name: "5", value: "5" },
    // { name: "6", value: "6" },
    // { name: "7", value: "7" },
    // { name: "8", value: "8" },
    // { name: "9", value: "9" },
    // { name: "10", value: "10" },
    // { name: "11", value: "11" },
    // { name: "12", value: "12" },
    // { name: "13", value: "13" },
    // { name: "14", value: "14" },
    // { name: "15", value: "15" },
    // { name: "16", value: "16" },
    // { name: "17", value: "17" },
    // { name: "18", value: "18" },
    // { name: "19", value: "19" },
    // { name: "20", value: "20" },
    // { name: "21", value: "21" },
    // { name: "22", value: "22" },
    // { name: "23", value: "23" },
    // { name: "24", value: "24" },
    // { name: "25", value: "25" },
    // { name: "26", value: "26" },
    // { name: "27", value: "27" },
    // { name: "28", value: "28" },
    // { name: "29", value: "29" },
    // { name: "30", value: "30" },
    // { name: "31", value: "31" },
    // { name: "32", value: "32" },
    // { name: "33", value: "33" },
    // { name: "34", value: "34" },
    // { name: "35", value: "35" },
    // { name: "36", value: "36" },
  ];
  if (!interaction.isAutocomplete()) return;

  if (interaction.commandName !== "gamble-roulette") return;

  //get the focused value
  const focusedValue = interaction.options.getFocused();

  const filteredChoices = betChoices.filter((betChoice) =>
    betChoice.name.toLowerCase().startsWith(focusedValue.toLowerCase())
  );

  const results = filteredChoices.map((choice) => {
    return {
      name: choice.name,
      value: choice.value,
    };
  });

  interaction.respond(results.slice(0, 25)).catch((error) => {
    console.error(error);
  });
});

// listen on twitter button click
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  // add more customIds here
  const customIds = new Set([
    "discord-blackjack-hitbtn",
    "discord-blackjack-splitbtn",
    "discord-blackjack-standbtn",
    "discord-blackjack-ddownbtn",
    "discord-blackjack-cancelbtn",
    "discord-blackjack-insbtn",
    "discord-blackjack-noinsbtn",
    "previous",
    "next",
    "add-money-confirm",
    "add-money-cancel",
    "stop-season-confirm",
    "stop-season-cancel",
    "remove-money-confirm",
    "remove-money-cancel",
  ]);
  // Check if the customId starts with "translate-"
  if (interaction.customId.startsWith("translate-")) {
    // If it starts with "translate-", return early
    console.log("1234fhuileawhfkljszdl")
    return;
  }

  if (customIds.has(interaction.customId)) {
    console.log("customId:", interaction.customId);
    return;
  }

  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const hasXRetweet = await checkXRetweetTaskByTweetId(interaction.customId);
  const hasXLike = await checkXLikeTaskByTweetId(interaction.customId);
  try {
    // if the tweet id is not in the x-retweet task table && x-like task table, return
    if (!hasXRetweet && !hasXLike) {
      await interaction.reply({
        content: `${translate.tweetNotInTaskTable}`,
        ephemeral: true,
      });
      return;
    }

    const xRetweetDeadline =
      (await getXRetweetTaskDeadline(interaction.customId)) || 0;
    const xLikeTaskDeadline =
      (await getXLikeTaskDeadline(interaction.customId)) || 0;

    // if the tweet is expired, return
    if (xRetweetDeadline < Date.now() && xLikeTaskDeadline < Date.now()) {
      await interaction.reply({
        content: `${translate.tweetExpired}`,
        ephemeral: true,
      });
      return;
    }

    const userId = interaction.user.id;
    const tweetId = interaction.customId;

    const RETWEET_BASEURL = "https://twitter.com/intent/retweet?tweet_id=";
    const LIKE_BASEURL = "https://twitter.com/intent/like?tweet_id=";
    const REPLY_BASEURL = "https://twitter.com/intent/tweet?in_reply_to=";
    const retweetUrl = RETWEET_BASEURL + tweetId;
    const likeUrl = LIKE_BASEURL + tweetId;
    const replyUrl = REPLY_BASEURL + tweetId;
    const redirectRetweetUrl = `${
      process.env.PUBLIC_IPv4_DNS_URL
    }/redirect/retweet?url=${encodeURIComponent(
      retweetUrl
    )}&id=${userId}&tweetId=${tweetId}`;
    const redirectLikeUrl = `${
      process.env.PUBLIC_IPv4_DNS_URL
    }/redirect/like?url=${encodeURIComponent(
      likeUrl
    )}&id=${userId}&tweetId=${tweetId}`;
    const redirectReplyUrl = `${
      process.env.PUBLIC_IPv4_DNS_URL
    }/redirect/reply?url=${encodeURIComponent(
      replyUrl
    )}&id=${userId}&tweetId=${tweetId}`;

    const retweet = new ButtonBuilder()
      .setURL(redirectRetweetUrl)
      .setLabel("Retweet")
      .setEmoji("🔁")
      .setStyle(ButtonStyle.Link);

    const like = new ButtonBuilder()
      .setURL(redirectLikeUrl)
      .setLabel("Like")
      .setEmoji("❤️")
      .setStyle(ButtonStyle.Link);

    const reply = new ButtonBuilder()
      .setURL(redirectReplyUrl)
      .setLabel("Reply")
      .setEmoji("💬")
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder<ButtonBuilder>();
    const replyEmbed = new EmbedBuilder().setTitle(`${translate.xAction}`);

    // check user's role
    if (
      !(await checkUserRoles(interaction, 3)) &&
      !(await checkUserRoles(interaction, 4))
    ) {
      replyEmbed.setTitle(`${translate.notTaskTargetRole}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // check has x-retweet task and not expired
    if (hasXRetweet && xRetweetDeadline > Date.now()) {
      row.addComponents(retweet);
    }
    // check has x-like task and not expired
    if (hasXLike && xLikeTaskDeadline > Date.now()) {
      row.addComponents(like);
    }

    row.addComponents(reply);

    await interaction.reply({
      embeds: [replyEmbed],
      components: [row],
      ephemeral: true,
    });
    return;
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Internal server error",
      ephemeral: true,
    });
  }
});

let seasonTimeout: NodeJS.Timeout | undefined;
let startReservationTimeout: NodeJS.Timeout;

async function endSeasonHandler() {
  try {
    const getCurrentSeasonRes = (await getLatestSeason()) || [];
    const currentDurationMs = Number(getCurrentSeasonRes[0].duration);
    const currentEndAt = Number(getCurrentSeasonRes[0].endAt);
    const currentStartAt = Number(getCurrentSeasonRes[0].startAt);

    console.log("currentDurationMs", currentDurationMs);
    console.log("currentEndAt", currentEndAt);
    console.log("currentStartAt", currentStartAt);
    console.log(currentEndAt - currentStartAt);
    // if the endAt is not changed, will auto start next season
    if (currentEndAt - currentStartAt == currentDurationMs) {
      console.log("endAt not changed. Will auto start next season.");
      await endSeasonSettlement(client);
      await createNextSeason();
      const getCurrentSeasonRes = (await getLatestSeason()) || [];
      const currentDuration = Number(getCurrentSeasonRes[0].duration);
      // call endSeasonHandler when time is up
      clearTimeout(seasonTimeout);
      seasonTimeout = setTimeout(endSeasonHandler, currentDuration);

      return;
    }
    // if the endAt is changed, will not auto start next season
    await endSeasonSettlement(client);
    // clear seasonInterval
    clearTimeout(seasonTimeout);
    seasonTimeout = undefined;
  } catch (error) {
    console.error(error);
  }
}

// start-season function & create season timeout
client.on("interactionCreate", async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName !== "start-season") return;

  try {
    const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // check if has the season interval (season already started)
    if (seasonTimeout) {
      replyEmbed.setTitle(`${translate.seasonAlreadyStarted}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const dateString = jstToUtc0(interaction.options.getString("date") || "");
    const dateTest = moment(dateString, "YYYY-MM-DD HH:mm:ss", true);

    if (!dateTest.isValid()) {
      replyEmbed.setTitle(`${translate.invalidDateFormat}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const date = new Date(dateString);
    const now = Date.now(); // now milliseconds
    const dateMilliseconds = date.getTime();

    // check if the date is in the past
    if (dateMilliseconds < now) {
      replyEmbed.setTitle(`${translate.invalidPastDate}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const remainingTime = dateMilliseconds - now;

    startReservationTimeout = setTimeout(async () => {
      await createNextSeason();
      const getCurrentSeasonRes = (await getLatestSeason()) || [];
      const currentDuration = Number(getCurrentSeasonRes[0].duration);
      // call endSeasonHandler when time is up
      seasonTimeout = setTimeout(endSeasonHandler, currentDuration);
    }, remainingTime);
    console.log("check-reservation interval:", startReservationTimeout);

    // write the reservation time to the database
    await storeReservation(1, dateMilliseconds.toString());

    replyEmbed
      .setTitle(`${translate.seasonReservationStart}`)
      .addFields({
        name: `${translate.seasonStartDate}`,
        value: date.toString(),
      })
      .addFields({
        name: `${translate.seasonStartDateInMs}`,
        value: dateMilliseconds.toString(),
      });

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
});

// stop-season function
client.on("interactionCreate", async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName !== "stop-season") return;

  try {
    const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("stop-season-confirm")
        .setLabel("confirm")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("stop-season-cancel")
        .setLabel("cancel")
        .setStyle(ButtonStyle.Danger)
    );

    const disabledRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("stop-season-confirm")
        .setLabel("confirm")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("stop-season-cancel")
        .setLabel("cancel")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true)
    );

    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    // check if has the season, if not, return
    if (!seasonTimeout) {
      replyEmbed.setTitle(`${translate.seasonNotStarted}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const dateString = jstToUtc0(interaction.options.getString("date") || "");
    const dateTest = moment(dateString, "YYYY-MM-DD HH:mm:ss", true);
    const date = new Date(dateString);

    if (!dateTest.isValid()) {
      replyEmbed.setTitle(`${translate.invalidDateFormat}`);
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    replyEmbed.setTitle(`${translate.seasonReservationStop}`).addFields({
      name: `${translate.seasonStopDate}`,
      value: date.toString(),
    });

    const message = await interaction.reply({
      embeds: [replyEmbed],
      components: [row],
      fetchReply: true,
    });

    // Create a collector to listen for button clicks
    const collector = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 1200000, // 20 minutes
    });

    collector.on("collect", async (i) => {
      if (i.customId === "stop-season-confirm") {
        const now = Date.now(); // now milliseconds
        const dateMilliseconds = date.getTime();

        // const getCurrentSeasonRes = (await getLatestSeason()) || [];
        // const currentEndAt = Number(getCurrentSeasonRes[0].endAt);

        // if the date is after the current season end date, return
        // if (dateMilliseconds >= currentEndAt) {
        //   replyEmbed.setTitle(`${translate.invalidStopDate}`);
        //   await i.update({ embeds: [replyEmbed], components: [disabledRow] });
        //   return;
        // }

        // if the date is in the past, return
        if (dateMilliseconds <= now) {
          replyEmbed.setTitle(`${translate.invalidPastDate}`);
          await i.update({ embeds: [replyEmbed], components: [disabledRow] });
          collector.stop("invalidPastDate");
          return;
        }

        // update the EndAt to dateMilliseconds
        await updateCurrentSeasonEndAt(dateMilliseconds.toString());
        const newDuration = dateMilliseconds - now;
        // set new season timeout
        clearTimeout(seasonTimeout);
        seasonTimeout = setTimeout(endSeasonHandler, newDuration);
        replyEmbed.setTitle("Success!");

        // Update the message with the new embed
        await i.update({ embeds: [replyEmbed], components: [disabledRow] });
        collector.stop("done");
      } else if (i.customId === "stop-season-cancel") {
        replyEmbed.setTitle("Cancel!");
        await i.update({ embeds: [replyEmbed], components: [disabledRow] });
        collector.stop("cancel");
      }
    });

    collector.on("end", async (collected, reason) => {
      try {
        if (reason === "time") {
          replyEmbed.setTitle(`${translate.timeout}`);
          // Update the message with the disabled buttons
          await message.edit({
            embeds: [replyEmbed],
            components: [disabledRow],
          });
        } else {
          // show other reasons
          console.log("collector end reason:", reason);
        }
      } catch (error) {
        // error handling
        console.error(error);
      }
      console.log("collector end");
      return;
    });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: translate.somethingWrong,
      ephemeral: true,
    });
    return;
  }
});

// log the season interval when check-season command is called
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName !== "check-season") return;

  console.log("check-season interval:", seasonTimeout);
});

const app = express();
const port = 3000;

app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if your using https
  })
);
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
      callbackURL: `${process.env.PUBLIC_IPv4_DNS_URL}/auth/twitter/callback`,
    },
    function (token, tokenSecret, profile, cb) {
      // In a real application, you'd typically store these values in the user's session
      // console.log(token, tokenSecret, profile);
      // The verify callback must call cb
      cb(null, profile);
    }
  )
);
app.use(cookieParser());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/twitter",
  (req, res, next) => {
    // console.log("req.query.userDiscordId:", req.query.userDiscordId);
    res.cookie("userDiscordId", req.query.userDiscordId, {
      maxAge: 900000,
      httpOnly: true,
    });
    next();
  },
  passport.authenticate("twitter")
);

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    // redirect to the home page (or discord-server-invite-link)
    failureRedirect: "https://www.tokyo-beast.com",
    // failureMessage: "Failed to connect to X.",
  }),
  async (req, res) => {
    console.log("callback finished.");
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) {
      console.log(`Guild with ID ${process.env.GUILD_ID} not found.`);
      return;
    }

    // check if the user id exists
    const userId = req.cookies.userDiscordId;
    await guild.members.fetch();
    const user = guild.members.cache.get(userId || "");
    if (!user) {
      console.log(
        `Member with ID ${userId} not found in guild ${process.env.GUILD_ID}.`
      );
      return;
    }

    // check if the role exists
    const role = guild.roles.cache.find(
      (role) => role.name === process.env.DISCORD_ROLE_NAME_XCONNECTED
    );
    if (!role) {
      // If the role does not exist, create it
      const newRole = await guild.roles.create({
        name: process.env.DISCORD_ROLE_NAME_XCONNECTED,
        color: "Blue",
      });
      console.log("Role X-Connected has been created.");
      await user.roles.add(newRole);
      console.log(`User with ID ${userId} has been given X-Connected role.`);
    } else {
      await user.roles.add(role);
      console.log(`User with ID ${userId} has been given X-Connected role.`);
    }

    // redirect to the home page (or discord-server-invite-link)
    // res.send("Connected to X and got X-Connected role.");
    res.json("Connected to X and got X-Connected role.");
    // res.redirect("https://www.tokyo-beast.com");
  }
);

export type TweetBase =
  | "retweet?tweet_id="
  | "like?tweet_id="
  | "tweet?in_reply_to=";

const checkParams = async (
  userId: string,
  tweetId: string,
  targetUrl: string,
  tweetType: TweetBase,
  res: Response
) => {
  // check if the userId, tweetId, url exist
  if (!userId.trim() || !tweetId.trim() || !targetUrl.trim()) {
    console.log("Missing userId, tweetId or targetUrl");
    res.status(400).send("Bad Request: Missing userId, tweetId or targetUrl");
    return false;
  }

  // check if the targetUrl is valid
  const baseUrl = `https://twitter.com/intent/${tweetType}${tweetId}`;
  if (baseUrl !== targetUrl) {
    console.log("Invalid targetUrl");
    res.status(400).send("Bad Request: Invalid targetUrl");
    return false;
  }

  if (!(await checkUser(userId))) {
    console.log("Invalid userId");
    res.status(400).send("Bad Request: Invalid userId");
    return false;
  }

  // check if the tweetId is in the table
  const hasXRetweet = await checkXRetweetTaskByTweetId(tweetId);
  const hasXLike = await checkXLikeTaskByTweetId(tweetId);

  if (!hasXRetweet && !hasXLike) {
    console.log("Invalid tweetId");
    res.status(400).send("Bad Request: Invalid tweetId");
    return false;
  }

  const xRetweetDeadline = (await getXRetweetTaskDeadline(tweetId)) || 0;
  const xLikeTaskDeadline = (await getXLikeTaskDeadline(tweetId)) || 0;

  // if the tweet is expired, return
  if (xRetweetDeadline < Date.now() && xLikeTaskDeadline < Date.now()) {
    console.log("This tweet is expired.");
    res.status(400).send("Bad Request: Expired tweet");
    return false;
  }

  return true;
};

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  // console.log("Hello World!");
});

app.get("/redirect/retweet", async (req, res) => {
  const targetUrl = req.query.url as string;
  const userId = req.query.id as string;
  const tweetId = req.query.tweetId as string;

  if (
    !(await checkParams(userId, tweetId, targetUrl, "retweet?tweet_id=", res))
  )
    return;

  const getXRetweetTaskTypeData = (await getTaskTypeByType("xRetweet")) || [];
  const { id: taskTypeId, reward } = getXRetweetTaskTypeData[0];

  // get taskId by tweetId
  const xRetweetTask = await getXRetweetTaskByTweetId(tweetId);
  const xRetweetTaskId = Number(xRetweetTask?.[0].id);
  // console.log("xRetweetTaskId", xRetweetTaskId);

  // check if the user has already completed this task
  if (await checkCompletedTask(taskTypeId, xRetweetTaskId, userId)) {
    console.log(`User ${userId} has already retweeted this tweet ${tweetId}.`);
    res.status(400).send("Bad Request: Already retweeted");
    return;
  }

  // if not, add reward to user
  const bonus = (await finalBonusAmount(taskTypeId, xRetweetTaskId)) || 0;
  const totalReward = Number(reward) + bonus;

  await updateMoney(userId, totalReward);
  console.log(`User ${userId} got ${reward} money. Bonus: ${bonus}`);

  // store user id and tweet id to the retweet table
  await createCompletedTask(taskTypeId, xRetweetTaskId, userId);

  console.log(`User with ID ${userId} is being redirected to ${targetUrl}`);
  res.redirect(targetUrl);

  return;
});

app.get("/redirect/like", async (req, res) => {
  const targetUrl = req.query.url as string;
  const userId = req.query.id as string;
  const tweetId = req.query.tweetId as string;

  if (!(await checkParams(userId, tweetId, targetUrl, "like?tweet_id=", res)))
    return;

  const getXLikeTaskTypeData = (await getTaskTypeByType("xLike")) || [];
  const { id: taskTypeId, reward } = getXLikeTaskTypeData[0];

  // get taskId by tweetId
  const xLikeTask = await getXLikeTaskByTweetId(tweetId);
  const xLikeTaskId = Number(xLikeTask?.[0].id);

  // check if the user has already completed this task
  if (await checkCompletedTask(taskTypeId, xLikeTaskId, userId)) {
    console.log(`User ${userId} has already Liked this tweet ${tweetId}.`);
    res.status(400).send("Bad Request: Already Liked");
    return;
  }

  // if not, add balance to user
  const bonus = (await finalBonusAmount(taskTypeId, xLikeTaskId)) || 0;
  const totalReward = Number(reward) + bonus;
  await updateMoney(userId, totalReward);
  console.log(`User ${userId} got ${reward} money. Bonus: ${bonus}`);

  // store user id and tweet id to the Like table
  await createCompletedTask(taskTypeId, xLikeTaskId, userId);

  console.log(`User with ID ${userId} is being redirected to ${targetUrl}`);
  res.redirect(targetUrl);

  return;
});

app.get("/redirect/reply", async (req, res) => {
  const targetUrl = req.query.url as string;
  const userId = req.query.id as string;
  const tweetId = req.query.tweetId as string;

  if (
    !(await checkParams(userId, tweetId, targetUrl, "tweet?in_reply_to=", res))
  )
    return;

  console.log(`User with ID ${userId} is being redirected to ${targetUrl}`);
  res.redirect(targetUrl);

  return;
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

//////////loading test//////////

// let totalResponseTime = 0;
// let requestCount = 0;
// const CALL_PER_SECOND = 100;
// const CALL_MINUSTES_TO_MS = 5 * 60 * 1000;
// Client.setMaxListeners(120);
// app.get("/loading-test", (req, res) => {
//   const intervalId = setInterval(() => {
//     const promises = [];

//     for (let i = 0; i < CALL_PER_SECOND; i++) {
//       const promise = axios
//         .get("http://localhost:3000/mock-check-balance")
//         // .get(`${process.env.PUBLIC_IPv4_DNS_URL}` + "/mock-check-balance")
//         .catch((error) => {
//           console.error(`Error: ${error}`);
//         });
//       promises.push(promise);
//     }

//     const requestStartTime = Date.now(); // Move this line here

//     Promise.all(promises)
//       .then(() => {
//         const responseTime = Date.now() - requestStartTime; // Now this measures the time for all promises
//         totalResponseTime += responseTime;
//         requestCount += promises.length;
//         // console.log(`Response time for all promises: ${responseTime} ms`);
//         console.log("All requests have been sent");
//       })
//       .catch((error) => {
//         console.error(`Error: ${error}`);
//       });
//   }, 1000);

//   setTimeout(() => {
//     clearInterval(intervalId);
//     const totalTime = totalResponseTime;
//     const averageResponseTime = totalResponseTime / requestCount;
//     console.log(
//       `Total time: ${totalTime} ms, Average response time: ${averageResponseTime} ms`
//     );
//     res.send(
//       JSON.stringify({
//         totalCount: requestCount,
//         totalTime: totalTime + " ms",
//         averageResponseTime: averageResponseTime + " ms",
//       })
//     );
//   }, CALL_MINUSTES_TO_MS);
// });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//// @ts-expect-error
// import * as MockInteractions from "discord.js-mock-interactions";
// import { BalanceDBDataSource } from "./sasat/dataSources/db/Balance";
// import { DebtDBDataSource } from "./sasat/dataSources/db/Debt";

// const interactionBuilder = MockInteractions.interactionBuilder;

// app.get("/mock-check-balance", async (req, res) => {
//   let responseTime = 0;
//   let endTime = 0;
//   const requestStartTime = Date.now();

//   const interaction = await interactionBuilder({
//     client,
//     applicationId: process.env.CLIENT_ID,
//     guildId: process.env.GUILD_ID,
//     channelId: "1194582929981050880", //test
//     userId: "693475597862567986",
//   });

//   const balanceReply = async () => {
//     try {
//       const userId = "693475597862567986";
//       const getBalanceById = await new BalanceDBDataSource().findById(
//         userId,
//         { fields: ["id", "balance"] },
//         { lock: "FOR UPDATE" }
//       );
//       const getDebtById = await new DebtDBDataSource().findById(
//         userId,
//         { fields: ["id", "balance"] },
//         { lock: "FOR UPDATE" }
//       );

//       // if there is no user's balance
//       if (!getBalanceById) {
//         console.log("getBalanceById is null");
//         return;
//       }

//       // if there is no user's debt
//       if (!getDebtById) {
//         console.log("getDebtById is null");
//         return;
//       }

//       endTime = Date.now();
//       responseTime = endTime - requestStartTime; // Update responseTime here
//       return;
//     } catch (error) {
//       console.error(error);
//       return;
//     }
//   };

//   const mockCkeckBalance = interaction({
//     type: 1,
//     name: "mock-check-balance",

//     // set the reply
//     reply: balanceReply,
//     // deferReply: balanceDeferReply,
//     // editReply: balanceEditReply,
//     // followUp: balanceFollowUp,
//     // deleteReply: balanceDeleteReply,
//     options: [
//       // command options
//       // await opts.build({ id: "bun", name: "user" }),
//     ],
//   });

//   client.emit("interactionCreate", mockCkeckBalance);

//   // Wait for balanceReply to finish
//   await new Promise((resolve) => {
//     client.once("interactionComplete", resolve);
//   });

//   res.send(
//     `Start Time: ${requestStartTime}, End Time: ${endTime} Response time: ${responseTime} ms`
//   );
// });

// // for testing the mock interaction
// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isCommand()) return;
//   if (interaction.commandName !== "mock-check-balance") return;

//   try {
//     await interaction.reply({});
//     client.emit("interactionComplete"); // Emit an event when reply is done
//     return;
//   } catch (error) {
//     console.error(error);
//   }
// });
