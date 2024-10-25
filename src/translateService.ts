import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function translateMessage(text: string, targetLanguage: string): Promise<string> {
  const prompt = `Translate the following text to ${getLanguageName(targetLanguage)}: ${text}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-3.5-turbo'
      messages: [{ role: 'system', content: prompt }],
    });

    // Null/Undefined check for choices and message
    const messageContent = response.choices?.[0]?.message?.content;
    if (!messageContent) {
      throw new Error("No content found in the OpenAI response");
    }

    return messageContent.trim();
  } catch (error) {
    console.error("Error translating message:", error);
    throw new Error("Translation failed.");
  }
}

/**
 * Helper function to get the full language name from its code.
 */
function getLanguageName(code: string): string {
  const languages: { [key: string]: string } = {
    zh: "Chinese",
    en: "English",
    fr: "French",
    de: "German",
    hi: "Hindi",
    it: "Italian",
    ar: "Arabic",
    ja: "Japanese",
    ko: "Korean",
    pt: "Portuguese",
    ru: "Russian",
    es: "Spanish",
  };

  return languages[code] || "English";
}
