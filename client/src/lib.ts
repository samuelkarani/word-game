import { WORDS_URL, T_DATA, SUCCESS_URL, FAILURE_URL } from "./constants";

// ui

export function showAlert(message: string): void {
  setTimeout(() => {
    alert(message);
  }, 0);
}

// api

const createOptions = (body: object) => ({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  method: "POST",
  body: JSON.stringify(body),
});

export async function fetchData(score: number): Promise<T_DATA> {
  const data = await fetch(WORDS_URL, createOptions({ score })).then((res) =>
    res.json()
  );
  return data;
}

export async function updateSuccess(word: string): Promise<void> {
  await fetch(SUCCESS_URL, createOptions({ word }));
}

export async function updateFailure(word: string): Promise<void> {
  await fetch(FAILURE_URL, createOptions({ word }));
}
