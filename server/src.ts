import { increment, updateWord } from "./db";

export async function translateWord(text: string): Promise<string> {
  let { data } = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({ q: text, target: "en", source: "fr" }),
    }
  ).then((res) => res.json());
  if (data) return data.translations[0].translatedText as string;
  return "";
}

export async function successWord(word: string): Promise<void> {
  console.log("success", word);
  await updateWord(word, { success: increment(1) });
}

export async function failureWord(word: string): Promise<void> {
  console.log("failure", word);
  await updateWord(word, { failure: increment(1) });
}
