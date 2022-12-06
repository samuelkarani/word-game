const randomNumber = (max: number): number => Math.floor(Math.random() * max);

export const randomItem = <T>(array: T[]): T =>
  array[randomNumber(array.length)];

export function getScore(word: string): number {
  if (word.length <= 4) return 0;
  if (word.length <= 6) return 5;
  if (word.length <= 8) return 10;
  if (word.length > 8) return 15;
  if (word.length > 11) return 20;
  return 0;
}
