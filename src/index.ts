import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  ComponentType,
  GatewayIntentBits,
  Collection,
} from "discord.js";
import express from "express";
import { DynamoDBClient, PutItemCommand, GetItemCommand ,UpdateItemCommand} from "@aws-sdk/client-dynamodb";
import { translateMessage } from "./translateService"; // Assumed to be implemented
import { askAibotCommand } from "@/commands/user/ask-aibot"; // Ensure the path is correct

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const dbClient = new DynamoDBClient({ region: "ap-northeast-1" });
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

// Initialize command list
const commandList = new Collection<string, any>();
commandList.set(askAibotCommand.data.name, askAibotCommand.execute); // Register ask-aibot command

client.on("messageCreate", async (message) => {
  try {
    // Allow specific channel to translate (announcement channels)
    const allowedTranslate = [
      process.env.ANNOUNCEMENT_CHANNEL_ID1, 
      process.env.ANNOUNCEMENT_CHANNEL_ID2,
      process.env.ANNOUNCEMENT_CHANNEL_ID3,
      process.env.ANNOUNCEMENT_CHANNEL_ID4, 
      process.env.ANNOUNCEMENT_CHANNEL_ID5, 
      process.env.ANNOUNCEMENT_CHANNEL_ID6,
      process.env.ANNOUNCEMENT_CHANNEL_ID7,
      process.env.ANNOUNCEMENT_CHANNEL_ID8,
      process.env.ANNOUNCEMENT_CHANNEL_ID9,
      process.env.ANNOUNCEMENT_CHANNEL_ID10,
      process.env.ANNOUNCEMENT_CHANNEL_ID11,
    ];

    if(!allowedTranslate.includes(message.channel.id)){
      console.log("Message is not in the allowed channel for translation."); // Log message if not in the correct channel
      return; // Exit if not in the target channel
    }

    // List of allowed bot IDs
    // const allowedBots = [
    //   process.env.BOT_ID1, 
    //   process.env.BOT_ID2,
    //   process.env.BOT_ID3,
    //   process.env.BOT_ID4 
    // ];
    // if (message.author.bot && !allowedBots.includes(message.author.id)) return;

    // Check if the message is from a bot
    if (message.author.bot) return; // Exit if the message is from a bot

    const translations: { [key: string]: string } = {};
    for (const lang of supportedLanguages) {
      const translatedText = await translateMessage(message.content, lang.code);
      translations[lang.code] = translatedText;
      console.log(`Translation saved for ${lang.code}: "${translatedText}"`);
    }

    const params = {
      TableName: "Test-TranslatedMessage",
      Item: {
        MessageID: { S: message.id },
        Translations: {
          M: Object.fromEntries(
            Object.entries(translations).map(([key, value]) => [key, { S: value }])
          )
        },
        OriginalMessage: { S: message.content },
      },
    };

    await dbClient.send(new PutItemCommand(params));
    console.log(`Translations saved for message ID: ${message.id}`);
    
    const buttonRows = supportedLanguages.map(lang => 
      new ButtonBuilder()
        .setCustomId(`translate-${lang.code}-${message.id}`)
        .setLabel(lang.name)
        .setStyle(ButtonStyle.Secondary)
    );

    const components = [];
    for (let i = 0; i < buttonRows.length; i += 5) {
      components.push(new ActionRowBuilder<ButtonBuilder>().addComponents(buttonRows.slice(i, i + 5)));
    }

    await message.reply({
      content: "Select a language to translate the message:",
      components: components,
    });

  } catch (error) {
    console.error("Error saving translation:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = commandList.get(interaction.commandName);
    if (command) {
      try {
        await command(interaction);
      } catch (error) {
        console.error("Error executing command:", error);
        await interaction.reply({
          content: "There was an error executing that command.",
          ephemeral: true,
        });
      }
    }
  } else if (interaction.isButton()) {
    const customId = interaction.customId;
    if (!customId.startsWith("translate-")) return;

    const [_, langCode, messageId] = customId.split("-");

    try {
      // Defer the reply to prevent interaction timeout
      await interaction.deferReply({ ephemeral: true });

      const params = {
        TableName: "Test-TranslatedMessage",
        Key: { MessageID: { S: messageId } },
      };

      const result = await dbClient.send(new GetItemCommand(params));
      const translations = result.Item?.Translations?.M || {};
      const translationForLang = translations[langCode]?.S;

      if (translationForLang) {
        // Check if there's already a counter for this button
        const currentCount = result.Item?.ButtonTaps?.M?.[langCode]?.N
          ? parseInt(result.Item.ButtonTaps.M[langCode].N, 10)
          : 0;

          const updateParams = {
            TableName: "Test-TranslatedMessage",
            Key: { MessageID: { S: messageId } },
            UpdateExpression: "SET #tapCount = if_not_exists(#tapCount, :start) + :increment",
            ExpressionAttributeNames: {
              "#tapCount": `TapCount_${langCode}`, // Store tap count for each language
            },
            ExpressionAttributeValues: {
              ":start": { N: "0" },      // Initialize count to 0 if it doesn't exist
              ":increment": { N: "1" }    // Increment tap count by 1
            },
          };
          
          await dbClient.send(new UpdateItemCommand(updateParams));
          console.log(`Incremented tap count for ${langCode} on message ID: ${messageId}`);

        // Respond with the fetched translation
        await interaction.editReply({
          content: translationForLang,
        });
      } else {
        await interaction.editReply({
          content: "Translation not found for this language.",
        });
      }
    }catch (error) {
      console.error("Error fetching translation:", error);
      await interaction.editReply({
        content: "Error occurred while fetching the translation.",
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN).then(() => {
  console.log(`Logged in as ${client.user?.tag}`);
});

const app = express();
const port = 3000;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));