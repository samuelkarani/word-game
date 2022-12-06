import * as React from "react";

type Props = {
  french: string;
  english: string;
  handleGuess: (guess: string) => void;
};

export default function Game({
  french,
  english,
  handleGuess,
}: Props): JSX.Element {
  const [guess, setGuess] = React.useState("");
  const remaining: number = english
    ? english.length - guess.length - 1
    : Number.POSITIVE_INFINITY;
  const disabled: boolean = remaining > 0;
  const hint: string = english.charAt(0);

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setGuess(e.currentTarget.value.toLocaleLowerCase());
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    handleGuess(guess);
    setGuess("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="margin-small word">{french}</div>
      <div className="margin-small word" hidden>
        {english}
      </div>
      <div className="margin-small guess">
        <span className="word">{hint}</span>
        <input
          className="input"
          type="text"
          value={guess}
          onChange={handleChange}
          maxLength={english.length - 1}
          size={english.length - 1}
          autoFocus
        />
        <button type="submit" className="button" disabled={disabled}>
          ok
        </button>
      </div>
      <div className="margin-small muted">{remaining} remaining</div>
    </form>
  );
}
