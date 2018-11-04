import React, { Component } from "react";
import ChallengeForm from "./ChallengeForm";

export default class Result extends Component {
  render() {
    const {
      start,
      end,
      url,
      challenge,
      onChallenge,
      challengeSent
    } = this.props;
    const result = Math.floor((end.getTime() - start.getTime()) / 1000);
    return (
      <div>
        <h2>
          You solved the sudoku in: <strong>{result}</strong> seconds
        </h2>
        {challenge &&
          challenge !== result && (
            <p>
              Your time was <strong>{Math.abs(result - challenge)}</strong>{" "}
              seconds{" "}
              <strong>
                {challenge > result ? "faster (wooot!)" : "slower (awww :/)"}
              </strong>{" "}
              than your challenger.
            </p>
          )}
        {challenge &&
          challenge == result && (
            <p>
              Your time was <strong>exactly the same</strong> as your
              challenger!
            </p>
          )}
        {!challenge && (
          <ChallengeForm
            onChallenge={onChallenge}
            challengeSent={challengeSent}
          />
        )}
      </div>
    );
  }
}
