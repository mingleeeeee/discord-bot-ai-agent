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

// Allow specific channels to translate (announcement channels)
const allowedTranslate = [
  process.env.ANNOUNCEMENT_CHANNEL_ID1,
  process.env.ANNOUNCEMENT_CHANNEL_ID2,
  process.env.ANNOUNCEMENT_CHANNEL_ID3,
  process.env.ANNOUNCEMENT_CHANNEL_ID4,
  process.env.ANNOUNCEMENT_CHANNEL_ID5,
  process.env.ANNOUNCEMENT_CHANNEL_ID6,
  process.env.ANNOUNCEMENT_CHANNEL_ID7,
  process.env.ANNOUNCEMENT_CHANNEL_ID9,
  process.env.ANNOUNCEMENT_CHANNEL_ID10,
  process.env.ANNOUNCEMENT_CHANNEL_ID11,
  process.env.ANNOUNCEMENT_CHANNEL_ID12,
  process.env.ANNOUNCEMENT_CHANNEL_ID13,
  process.env.ANNOUNCEMENT_CHANNEL_ID14,
process.env.ANNOUNCEMENT_CHANNEL_ID15,
process.env.ANNOUNCEMENT_CHANNEL_ID16,
].filter(Boolean); 
// Allow specific forum channels
const forumChannels = [
  process.env.FORUM_CHANNEL1,
  process.env.FORUM_CHANNEL2,
].filter(Boolean);

// Check if the message is in an allowed channel or thread
if (
  !allowedTranslate.includes(message.channel.id) &&
  !(
    message.channel.isThread() &&
    forumChannels.includes(message.channel.parentId)
  )
) {
  console.log("Message is not in the allowed channel or thread under the forum for translation.");
  return; // Exit if not in the target channel or forum thread
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
      TableName: "TranslatedMessages",
      Item: {
        MessageID: { S: message.id },
        Translations: {
          M: Object.fromEntries(
            Object.entries(translations).map(([key, value]) => [key, { S: value }])
          )
        },
        OriginalMessage: { S: message.content },
        Timestamp: { S: new Date().toISOString() }
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

// Helper function to log button taps in DAU-log
async function logButtonTap(userId: string, langCode: string, userLocale: string) {
  const today = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
  const timestamp = `${today}T00:00:00Z`;
  const tapCountAttribute = `TapCount_${langCode}`; // Attribute name format

  try {
    // Get current record for today
    const getParams = {
      TableName: "DAU-log",
      Key: {
        UserID: { S: userId },
        Timestamp: { S: timestamp },
      },
    };

    let getResult;
    try {
      getResult = await dbClient.send(new GetItemCommand(getParams));
    } catch (getError) {
      console.error("Error fetching existing DAU-log entry:", getError);
      return; // Exit if there was an error fetching data
    }

    if (getResult?.Item) {
      // Update existing record, incrementing the tap count for the specific language
      const updateParams = {
        TableName: "DAU-log",
        Key: {
          UserID: { S: userId },
          Timestamp: { S: timestamp },
        },
        UpdateExpression: `SET #tapCount = if_not_exists(#tapCount, :start) + :inc, TotalTapCount = if_not_exists(TotalTapCount, :start) + :inc`,
        ExpressionAttributeNames: {
          "#tapCount": tapCountAttribute, // Use dynamic attribute name
        },
        ExpressionAttributeValues: {
          ":start": { N: "0" },
          ":inc": { N: "1" },
        },
      };

      try {
        await dbClient.send(new UpdateItemCommand(updateParams));
      } catch (updateError) {
        console.error("Error updating DAU-log entry:", updateError);
      }

    } else {
      // Create a new record with initial counts
      const putParams = {
        TableName: "DAU-log",
        Item: {
          UserID: { S: userId },
          Timestamp: { S: timestamp },
          [tapCountAttribute]: { N: "1" }, // Initial tap count for this language
          TotalTapCount: { N: "1" },
          Locale: { S: userLocale }
        },
      };

      try {
        await dbClient.send(new PutItemCommand(putParams));
      } catch (putError) {
        console.error("Error creating new DAU-log entry:", putError);
      }
    }
  } catch (error) {
    console.error("Unexpected error in logButtonTap:", error);
  }
}
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
    // Defer the reply to prevent interaction timeout
    await interaction.deferReply({ ephemeral: true });
    const customId = interaction.customId;
    if (!customId.startsWith("translate-")) return;

    const [_, langCode, messageId] = customId.split("-");

    try {
      const params = {
        TableName: "TranslatedMessages",
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
            TableName: "TranslatedMessages",
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
//        await interaction.editReply({
  //        content: translationForLang,
    //    });


// added for over 2000 char limit
const MAX_MESSAGE_LENGTH = 2000;

// Function to split the message into chunks
const splitMessage = (text: string, maxLength: number): string[] => {
  const chunks = [];
  while (text.length > maxLength) {
    let chunk = text.slice(0, maxLength);
    const lastSpace = chunk.lastIndexOf(' '); // Avoid breaking words
    if (lastSpace > 0) chunk = text.slice(0, lastSpace); // Split at the last space if possible
    chunks.push(chunk.trim());
    text = text.slice(chunk.length).trim();
  }
  chunks.push(text); // Add the remaining text
  return chunks;
};

try {
  // Ensure deferReply is called only once
  if (!interaction.deferred && !interaction.replied) {
    await interaction.deferReply({ ephemeral: true });
  }

  if (!translationForLang || translationForLang.trim().length === 0) {
    await interaction.editReply({
      content: "Translation not available or empty.",
    });
    return;
  }

  if (translationForLang.length > MAX_MESSAGE_LENGTH) {
    // Split the translation into chunks
    const messages = splitMessage(translationForLang, MAX_MESSAGE_LENGTH);

    // Send each chunk as a follow-up
    for (const chunk of messages) {
      await interaction.followUp({
        content: chunk,
        ephemeral: true, // Optional: Adjust based on your use case
      });
    }
  } else {
    // If the message is within the limit, edit the deferred reply
    await interaction.editReply({
      content: translationForLang,
    });
  }
} catch (error) {
  console.error("Error fetching or sending translation:", error);

  // Ensure proper error handling only if the interaction has not been replied to
  if (!interaction.replied) {
    await interaction.editReply({
      content: "An error occurred while processing the translation.",
    });
  }
}

////


         // for DAU-log
        const userLocale = interaction.locale;
        await logButtonTap(interaction.user.id, langCode, userLocale); // Logs the button tap in DAU-log
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