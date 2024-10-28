import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { Command } from "@/commands/commands";
import OpenAI from 'openai';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { Readable } from 'stream';
import { franc } from 'franc';


dotenv.config();

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

// Function to handle GPT response with enforced language
const handleGptResponse = async (interaction: ChatInputCommandInteraction, query: string, context: string) => {
  try {
    // Retrieve the user's locale
    const userLocale = interaction.locale; // e.g., "en-US", "fr-FR"
    console.log(`User's locale: ${userLocale}`);
   // Query 
   console.log(`Query: ${query}`)
   // Create the prompt with the dynamic language instructions
   const prompt = `You should answer in this language: ${userLocale} based on this question: ${query}`;
    // Defer the reply to prevent interaction timeout
    await interaction.deferReply({ephemeral: true });

    // Make a request to OpenAI's chat completion API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Use GPT-4o model or another available model
      messages: [
        { role: "system", content: `You should reply in this language in default unless user ask you to reply in other language: ${userLocale}You are a Discord bot helping users with questions related to the TokyoBeast based on the context below. \
          You can only responed to questions related to this Tokyobeast, web3, blockchain, or topic related to this document.
          Respond in the same language as the user's query. Here is the context from the provided documents: \n\n${context}` },
        { role: "user", content: prompt }
      ],
    });

    // Extract the response text from the completion result
    const responseText = response.choices[0]?.message?.content || 'No response received from the model.';

    // Send the response back to the user
    await interaction.editReply({ 
      content: responseText });

  }
   catch (error) {
    console.error(error);
    await interaction.editReply({
      content: 'Something went wrong while generating the response.'
    });
  }
};

// Define the command's execute function
const execute: Command = async (interaction: ChatInputCommandInteraction):Promise<void>  => {
  
  try {
    // Check if the command is used in the correct channel
    if (interaction.channelId !== process.env.ASK_AI_CHANNEL_ID ) {
       await interaction.reply({
        content: "This command can only be used in the ai-chat-bot channel.",
        ephemeral: true // Optional: makes the reply visible only to the user
      });
      return;
    }


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
