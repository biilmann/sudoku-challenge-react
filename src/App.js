import React, { Component } from "react";
import produce from "immer";
import { generateSudoku, checkSolution, shareUrl } from "./lib/sudoku";
import SudokuBoard from "./components/SudokuBoard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku(),
      challengeSent: false
    }));
  }

  handleChange = e => {
    this.setState(
      produce(state => {
        const field = state.sudoku.rows[e.row].cols[e.col];
        field.value = e.value;
        this.handleSolution(state);
      })
    );
  };

  handleSolution = state => {
    if (!state.sudoku.solveTime && checkSolution(state.sudoku)) {
      state.sudoku.solveTime = new Date();
      state.sudoku.shareUrl = shareUrl(state.sudoku);
      if (state.sudoku.challengeTime) {
        this.handleResult(state);
      }
    }
  };

  handleSolve = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row => {
          row.cols.forEach(col => {
            col.value = state.sudoku.solution[col.row * 9 + col.col];
          });
        });
        this.handleSolution(state);
      })
    );
  };

  handleChallenge = e => {
    fetch("/.netlify/functions/mail/challenge", {
      method: "post",
      body: JSON.stringify({
        from: e.from,
        to: e.to,
        sender: e.sender,
        url: shareUrl(this.state.sudoku, e.from, e.to)
      })
    });
    this.setState(
      produce(state => {
        state.challengeSent = true;
      })
    );
  };

  handleResult = state => {
    const { sudoku } = state;
    fetch("/.netlify/functions/mail/result", {
      method: "post",
      body: JSON.stringify({
        from: sudoku.challengeFrom,
        to: sudoku.challengeFrom,
        fromTime: sudoku.challengeTime,
        toTime: Math.floor(
          (sudoku.solveTime.getTime() - sudoku.startTime.getTime()) / 1000
        )
      })
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sudoku Challenge</h1>
        </header>
        <SudokuBoard
          sudoku={this.state.sudoku}
          onChange={this.handleChange}
          onChallenge={this.handleChallenge}
          challengeSent={this.state.challengeSent}
        />
        {false && <button onClick={this.handleSolve}>Solve Magically</button>}
      </div>
    );
  }
}

export default App;
