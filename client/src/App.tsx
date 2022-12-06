import * as React from "react";
import Game from "./Game";
import {
  INITIAL_SCORE,
  LOSING_SCORE,
  RIGHT_POINT,
  WINNING_SCORE,
  WRONG_POINT,
} from "./constants";
import { fetchData, showAlert, updateFailure, updateSuccess } from "./lib";

export default function App() {
  const [progressing, setProgressing] = React.useState(false);
  const [score, setScore] = React.useState(INITIAL_SCORE);
  const [wins, setWins] = React.useState(0);
  const [losses, setLosses] = React.useState(0);
  const [french, setFrench] = React.useState("");
  const [english, setEnglish] = React.useState("");

  function handleFetch(score: number): void {
    fetchData(score).then((data) => {
      setFrench(data.word);
      setEnglish(data.translation);
    });
  }

  function handleStart(): void {
    setScore(INITIAL_SCORE);
    setProgressing(true);
    handleFetch(score);
  }

  function handleEnd(): void {
    setProgressing(false);
  }

  function handleCheck(newScore: number): void {
    if (newScore === WINNING_SCORE) {
      setWins((wins) => wins + 1);
      handleEnd();
      showAlert("you have won!");
    } else if (newScore === LOSING_SCORE) {
      setLosses((losses) => losses + 1);
      handleEnd();
      showAlert("you have lost!");
    } else {
      handleFetch(newScore);
    }
  }

  function handleGuess(guess: string): void {
    let newScore: number;
    if (guess === english.substring(1)) {
      newScore = score + RIGHT_POINT;
      updateSuccess(french);
    } else {
      newScore = score + WRONG_POINT;
      updateFailure(french);
    }
    setScore(newScore);
    handleCheck(newScore);
  }

  return (
    <div className="center">
      <div>
        {!progressing && (
          <div>
            <div className="margin">
              <span className="wins">{wins} wins </span>
              <span className="losses">{losses} losses</span>
            </div>
            <div className="margin">
              <button type="button" className="button" onClick={handleStart}>
                start game
              </button>
            </div>
          </div>
        )}
        {progressing && (
          <div>
            <div className="margin score">{score} points</div>
            <div className="margin game">
              <Game
                french={french}
                english={english}
                handleGuess={handleGuess}
              />
            </div>
            <div className="margin">
              <button type="button" className="button" onClick={handleEnd}>
                end game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
