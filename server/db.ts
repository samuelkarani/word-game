import { getScore, randomItem } from "./util";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import serviceAccount from "./.google.json";

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});
const db = getFirestore();
const wordsRef = db.collection("words");
type T_DATA = {
  word: string;
  score: string;
};

export async function addWords(words: string[]): Promise<void> {
  let batch = db.batch();
  let count = 0;

  for (const word of words) {
    batch.set(wordsRef.doc(word), { word, score: getScore(word) });
    count += 1;
    if (count === 500) {
      console.log("running batch", count);
      await batch.commit();
      batch = db.batch();
      count = 0;
    }
  }

  if (count) {
    console.log("running batch", count);
    await batch.commit();
    batch = db.batch();
    count = 0;
  }
}

export async function fetchWord(score: number): Promise<string> {
  const value = Math.floor(score / 5) * 5;
  const snapshot = await wordsRef
    .where("score", ">=", value)
    .where("score", "<", value + 5)
    .get();
  const data: T_DATA[] = [];
  snapshot.forEach((doc) => {
    data.push(doc.data() as T_DATA);
  });
  console.log(`score: ${score} value: ${value} words: ${data.length}`);
  const item = randomItem(data);
  return item.word;
}

export async function updateWord(word: string, data: object): Promise<void> {
  await wordsRef.doc(word).update(data);
}

export const { increment } = FieldValue;
