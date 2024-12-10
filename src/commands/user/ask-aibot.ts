import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { Command } from "@/commands/commands";
import OpenAI from 'openai';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient,GetItemCommand,PutItemCommand,QueryCommand,UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';
import { Readable } from 'stream';
import { franc } from 'franc';

dotenv.config();
const dbClient = new DynamoDBClient({ region: "ap-northeast-1" });
// Initialize AWS S3 client (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Function to stream the S3 object body to a string
const streamToString = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
};

// Function to list all files in the RAG folder in S3
const listFilesInS3 = async (): Promise<string[]> => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.BUCKET_NAME,
    Prefix: process.env.BUCKET_FOLDER,
  });

  const data = await s3.send(command);
  return data.Contents?.map(file => file.Key!) || [];
};

// Function to retrieve content from S3 files
const getFileContentFromS3 = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  const data = await s3.send(command);
  return data.Body instanceof Readable ? await streamToString(data.Body) : '';
};

// Function to load and concatenate all content from the RAG folder
const loadAllContentFromRAG = async (): Promise<string> => {
  const files = await listFilesInS3();
  let allContent = '';
  for (const file of files) {
    const content = await getFileContentFromS3(file);
    allContent += content + '\n\n';
  }
  return allContent;
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Helper function to update or create a new record for AskAI usage count
async function updateDAULog(userId: string, locale: string) {
  const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
  const timestamp = `${today}T00:00:00Z`; // Standardize to start of the day

  try {
    // Check if there is an existing record for today
    const getParams = {
      TableName: "DAU-log",
      Key: {
        UserID: { S: userId },
        Timestamp: { S: timestamp },
      },
    };

    const getResult = await dbClient.send(new GetItemCommand(getParams));
    
    if (getResult?.Item) {
      // If a record exists, increment the UsageCount for AskAI
      const updateParams = {
        TableName: "DAU-log",
        Key: {
          UserID: { S: userId },
          Timestamp: { S: timestamp },
        },
        UpdateExpression: "SET AskAI = if_not_exists(AskAI, :start) + :inc",
        ExpressionAttributeValues: {
          ":start": { N: "0" }, // Initial count if AskAI attribute does not exist
          ":inc": { N: "1" },   // Increment by 1
        },
      };

      await dbClient.send(new UpdateItemCommand(updateParams));
      console.log(`Updated DAU-log for user: ${userId}, incremented AskAI count.`);
      
    } else {
      // If no record exists, create a new entry with UsageCount set to 1
      const putParams = {
        TableName: "DAU-log",
        Item: {
          UserID: { S: userId },
          Timestamp: { S: timestamp },
          AskAI: { N: "1" },        // Initial UsageCount
          Locale: { S: locale },
        },
      };

      await dbClient.send(new PutItemCommand(putParams));
      console.log(`Created new DAU-log entry for user: ${userId} with initial AskAI count of 1.`);
    }
  } catch (error) {
    console.error("Error updating DAU-log entry:", error);
  }
}

const handleGptResponse = async (interaction: ChatInputCommandInteraction, query: string, context: string) => {
  try {
    const timestamp = new Date().toISOString();
    const userId = interaction.user.id;
    const userLocale = interaction.locale;
    console.log(`User's locale: ${userLocale}`);
    console.log(`Query: ${query}`);

    // Defer the reply to prevent interaction timeout
    await interaction.deferReply({ ephemeral: true });

    // Initialize usage count to 1 and increment if previous records exist
    let currentCount = 1;
    try {
      const getParams = {
        TableName: "Feedback-FAQ",
        KeyConditionExpression: "UserID = :userId",
        ExpressionAttributeValues: { ":userId": { S: userId } },
        ProjectionExpression: "UsageCount",
      };

      const getResult = await dbClient.send(new QueryCommand(getParams));
      if (getResult.Items && getResult.Items.length > 0) {
        const maxUsageCount = Math.max(
          ...getResult.Items.map(item => parseInt(item.UsageCount?.N || '0', 10))
        );
        currentCount = maxUsageCount + 1;
      }
    } catch (error) {
      console.error("Error fetching user records:", error);
    }

    //footer
// Footer dictionary for different languages
const footers: { [key: string]: string } = {
  "da": `
For mere information om TOKYO BEAST, se venligst følgende:
- Officiel X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Hjemmeside: [Officiel Hjemmeside](https://www.tokyo-beast.com/)
- Hvidbog: [Læs Hvidbogen](https://www.tokyo-beast.com/whitepaper/)
  `,
  "de": `
Für weitere Informationen über TOKYO BEAST besuchen Sie bitte:
- Offizielle X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Webseite: [Offizielle Webseite](https://www.tokyo-beast.com/)
- Whitepaper: [Lesen Sie das Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "en-GB": `
For more details and the latest information about TOKYO BEAST, please check the following:
- Official X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Website: [Official Website](https://www.tokyo-beast.com/)
- Whitepaper: [Read the Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "en-US": `
For more details and the latest information about TOKYO BEAST, please check the following:
- Official X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Website: [Official Website](https://www.tokyo-beast.com/)
- Whitepaper: [Read the Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "es-ES": `
Para obtener más detalles e información sobre TOKYO BEAST, consulte lo siguiente:
- X oficial: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Sitio web: [Sitio Oficial](https://www.tokyo-beast.com/)
- Whitepaper: [Leer el Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "fr": `
Pour plus d'informations sur TOKYO BEAST, veuillez consulter les liens suivants :
- X officiel : [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Site Web : [Site Officiel](https://www.tokyo-beast.com/)
- Livre Blanc : [Lire le Livre Blanc](https://www.tokyo-beast.com/whitepaper/)
  `,
  "hr": `
Za više informacija o TOKYO BEAST pogledajte sljedeće:
- Službeni X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Web stranica: [Službena web stranica](https://www.tokyo-beast.com/)
- Bijela knjiga: [Pročitajte bijelu knjigu](https://www.tokyo-beast.com/whitepaper/)
  `,
  "it": `
Per maggiori dettagli su TOKYO BEAST, consulta i seguenti link:
- X ufficiale: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Sito web: [Sito ufficiale](https://www.tokyo-beast.com/)
- Whitepaper: [Leggi il whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "lt": `
Norėdami sužinoti daugiau apie TOKYO BEAST, apsilankykite:
- Oficiali X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Svetainė: [Oficiali svetainė](https://www.tokyo-beast.com/)
- Whitepaper: [Skaityti Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "hu": `
További információk a TOKYO BEAST-ről az alábbi linken találhatók:
- Hivatalos X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Weboldal: [Hivatalos weboldal](https://www.tokyo-beast.com/)
- Fehér könyv: [Olvassa el a Fehér könyvet](https://www.tokyo-beast.com/whitepaper/)
  `,
  "nl": `
Voor meer informatie over TOKYO BEAST, zie de volgende links:
- Officiële X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Website: [Officiële Website](https://www.tokyo-beast.com/)
- Whitepaper: [Lees het Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "no": `
For mer informasjon om TOKYO BEAST, vennligst se:
- Offisiell X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Nettsted: [Offisiell Nettsted](https://www.tokyo-beast.com/)
- Whitepaper: [Les Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "pl": `
Aby uzyskać więcej informacji na temat TOKYO BEAST, zobacz:
- Oficjalny X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Witryna: [Oficjalna Witryna](https://www.tokyo-beast.com/)
- Whitepaper: [Przeczytaj Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "pt-BR": `
Para mais detalhes sobre TOKYO BEAST, veja:
- X oficial: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Website: [Site Oficial](https://www.tokyo-beast.com/)
- Whitepaper: [Leia o Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "ro": `
Pentru mai multe detalii despre TOKYO BEAST, consultați:
- X oficial: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Website: [Website Oficial](https://www.tokyo-beast.com/)
- Whitepaper: [Citește Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "fi": `
Lisätietoja TOKYO BEASTista löydät seuraavista linkeistä:
- Virallinen X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Verkkosivusto: [Virallinen Verkkosivusto](https://www.tokyo-beast.com/)
- Whitepaper: [Lue Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "sv-SE": `
För mer information om TOKYO BEAST, se:
- Officiell X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Webbplats: [Officiell Webbplats](https://www.tokyo-beast.com/)
- Whitepaper: [Läs Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "vi": `
Để biết thêm thông tin về TOKYO BEAST, vui lòng xem:
- X chính thức: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Trang web: [Trang web chính thức](https://www.tokyo-beast.com/)
- Whitepaper: [Đọc Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "tr": `
TOKYO BEAST hakkında daha fazla bilgi için lütfen şunlara bakın:
- Resmi X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Web Sitesi: [Resmi Web Sitesi](https://www.tokyo-beast.com/)
- Whitepaper: [Whitepaper Okuyun](https://www.tokyo-beast.com/whitepaper/)
  `,
  "cs": `
Pro více informací o TOKYO BEAST prosím navštivte:
- Oficiální X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Webová stránka: [Oficiální Web](https://www.tokyo-beast.com/)
- Whitepaper: [Přečtěte si Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "el": `
Για περισσότερες λεπτομέρειες για TOKYO BEAST, δείτε τα παρακάτω:
- Επίσημο X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Ιστότοπος: [Επίσημος Ιστότοπος](https://www.tokyo-beast.com/)
- Whitepaper: [Διαβάστε το Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "bg": `
За повече информация относно TOKYO BEAST, моля посетете:
- Официален X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Уебсайт: [Официален Уебсайт](https://www.tokyo-beast.com/)
- Whitepaper: [Прочетете Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "ru": `
Для получения дополнительной информации о TOKYO BEAST посетите:
- Официальный X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Сайт: [Официальный Сайт](https://www.tokyo-beast.com/)
- Whitepaper: [Прочитать Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "uk": `
Для отримання додаткової інформації про TOKYO BEAST відвідайте:
- Офіційний X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- Вебсайт: [Офіційний Вебсайт](https://www.tokyo-beast.com/)
- Whitepaper: [Читати Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "hi": `
TOKYO BEAST के बारे में अधिक जानकारी के लिए कृपया देखें:
- आधिकारिक X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- वेबसाइट: [आधिकारिक वेबसाइट](https://www.tokyo-beast.com/)
- श्वेतपत्र: [श्वेतपत्र पढ़ें](https://www.tokyo-beast.com/whitepaper/)
  `,
  "th": `
สำหรับข้อมูลเพิ่มเติมเกี่ยวกับ TOKYO BEAST โปรดดูที่:
- X อย่างเป็นทางการ: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- เว็บไซต์: [เว็บไซต์อย่างเป็นทางการ](https://www.tokyo-beast.com/)
- Whitepaper: [อ่าน Whitepaper](https://www.tokyo-beast.com/whitepaper/)
  `,
  "zh-CN": `
有关 TOKYO BEAST 的更多信息，请查看以下内容：
- 官方 X：[TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- 网站：[官方网站](https://www.tokyo-beast.com/)
- 白皮书：[阅读白皮书](https://www.tokyo-beast.com/whitepaper/)
  `,
  "zh-TW": `
有關 TOKYO BEAST 的更多資訊，請查看以下內容：
- 官方 X：[TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- 網站：[官方網站](https://www.tokyo-beast.com/)
- 白皮書：[閱讀白皮書](https://www.tokyo-beast.com/whitepaper/)
  `,
  "ja": `
TOKYO BEASTに関する詳細情報は、以下をご確認ください：
- 公式 X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- ウェブサイト: [公式サイト](https://www.tokyo-beast.com/)
- ホワイトペーパー: [ホワイトペーパーを読む](https://www.tokyo-beast.com/whitepaper/)
  `,
  "ko": `
TOKYO BEAST에 대한 자세한 내용은 다음을 확인하세요:
- 공식 X: [TOKYO BEAST](https://x.com/TOKYOBEAST_EN)
- 웹사이트: [공식 웹사이트](https://www.tokyo-beast.com/)
- 백서: [백서 읽기](https://www.tokyo-beast.com/whitepaper/)
  `,
};

const footer = footers[userLocale] || footers['en']; // Default to English if language not found
console.log(`Selected footer for locale: ${userLocale}`);


    // Create the prompt and request to OpenAI
    const prompt = `You should answer in this language: ${userLocale} based on this question: ${query}`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: "system", content: `Reply in this language unless requested otherwise: ${userLocale}. You are a Discord bot answering questions about TokyoBeast, web3, or related topics. Context:\n\n${context}` },
        { role: "user", content: prompt }
      ],
    });

   const responseText = response.choices[0]?.message?.content || 'No response received from the model.';
   const fullText = `${responseText}\n\n${footer}`;    
 await interaction.editReply({ content: fullText });

    // Store the new record in DynamoDB with incremented UsageCount
    const dbParams = {
      TableName: "Feedback-FAQ",
      Item: {
        UserID: { S: userId },
        Timestamp: { S: timestamp },
        Query: { S: query },
        Response: { S: responseText },
        Locale: { S: interaction.locale },
        UsageCount: { N: currentCount.toString() },
      },
    };

    await dbClient.send(new PutItemCommand(dbParams));
    console.log(`New record stored for user: ${userId}, Usage Count: ${currentCount}, Query: ${query}, Response: ${responseText}`);
    // Log the usage in DAU-log
    await updateDAULog(interaction.user.id, interaction.locale);
    console.log(`DAU-log updated for user: ${interaction.user.id}`);
  } catch (error) {
    console.error(error);
    await interaction.editReply({
      content: 'Something went wrong while generating the response.',
    });
  }
};

// Define the command's execute function
const execute: Command = async (interaction: ChatInputCommandInteraction):Promise<void>  => {
  
  try {
    // Check if the command is used in the correct channel
   
// Define allowed channels and filter out null or undefined values
const allowedChannels = [
  process.env.ASK_AI_CHANNEL_ID1,
  process.env.ASK_AI_CHANNEL_ID2
].filter(Boolean); // Filters out falsy values like null, undefined, or empty strings

if (!allowedChannels.includes(interaction.channelId)) {
  await interaction.reply({
    content: "This command can only be used in the ai-chat-bot channel.",
    ephemeral: true // Optional: makes the reply visible only to the user
  });
  return;
}

// if (interaction.channelId !== process.env.ASK_AI_CHANNEL_ID ) {
  //     await interaction.reply({
    //    content: "This command can only be used in the ai-chat-bot channel.",
     //   ephemeral: true // Optional: makes the reply visible only to the user
     //});
     // return;
    //}


    const query = interaction.options.getString('query') || '';
    // Load all content from S3 RAG folder
    const allContent = await loadAllContentFromRAG();

    // Handle GPT response with the document context and language detection
    await handleGptResponse(interaction, query, allContent);

  } catch (error) {
    console.error(error);
    // Reply with an error message if something goes wrong
    await interaction.reply({
      content: 'Something went wrong while processing your request.',
      ephemeral: true,  // Use ephemeral here for privacy
    });
  }
};

// Define the /ask-aibot command with explicit data and execute
export const askAibotCommand = {
  data: new SlashCommandBuilder()
    .setName('ask-aibot')
    .setDescription('Ask a question about TokyoBeast!')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Your question')
        .setRequired(true)
    ),
  execute,
};
