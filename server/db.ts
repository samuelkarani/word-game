import { getScore, randomItem } from "./util";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import serviceAccount from "./.google.json";

interface ServiceAccount {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
}
export type Entry = {
  word: string;
  score: number;
  success: number;
  failure: number;
};

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: process.env.DATABASE_URL,
});
const db = getFirestore();
export const { increment } = FieldValue;
const wordsRef = db.collection("words");
const batchLimit = 500;

export async function addWords(words: string[]): Promise<void> {
  let batch = db.batch();
  let count = 0;

  for (const word of words) {
    const ref = wordsRef.doc(word);
    const data = { word, score: getScore(word), success: 0, failure: 0 };
    batch.set(ref, data);
    count += 1;
    if (count === batchLimit) {
      console.log("running batch", count);
      await batch.commit();
      batch = db.batch();
      count = 0;
    }
  }

  if (count) {
    console.log("running batch", count);
    await batch.commit();
  }
}

export async function fetchWord(score: number): Promise<string> {
  const offset = 5;
  const value = Math.floor(score / offset) * offset;
  const snapshot = await wordsRef
    .where("score", ">=", value)
    .where("score", "<", value + offset)
    .get();
  const data: Entry[] = [];
  snapshot.forEach((doc) => {
    data.push(doc.data() as Entry);
  });
  console.log(`score: ${score} value: ${value} words: ${data.length}`);
  const item = randomItem(data);
  return item.word;
}

export async function updateWord(word: string, data: object): Promise<void> {
  await wordsRef.doc(word).update(data);
}
