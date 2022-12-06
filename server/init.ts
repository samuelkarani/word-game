import fs from "fs";
import readline from "readline";
import { addWords } from "./db";

type T_WORDS = string[];

async function readWords(): Promise<T_WORDS> {
  return new Promise((resolve, reject) => {
    const file = "verbs.txt";
    const input = fs.createReadStream(file);
    input.on("error", reject);
    const reader = readline.createInterface({ input });
    const array: T_WORDS = [];
    reader.on("line", (line) => array.push(line));
    reader.on("close", () => resolve(array));
  });
}

export default async function init(): Promise<void> {
  try {
    console.log("reading words");
    const words = await readWords();
    console.log("writing words");
    await addWords(words);
  } catch (error) {
    console.error(error);
  }
}
