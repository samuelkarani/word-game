export const INITIAL_SCORE = 10;
export const WINNING_SCORE = 20;
export const LOSING_SCORE = 0;
export const RIGHT_POINT = 1;
export const WRONG_POINT = -1;
const BASE_URL = "http://localhost:8080";
export const WORDS_URL = `${BASE_URL}/word`;
export const SUCCESS_URL = `${BASE_URL}/success`;
export const FAILURE_URL = `${BASE_URL}/failure`;
export type T_DATA = {
  word: string;
  translation: string;
};
