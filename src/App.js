import React, { Component } from "react";
import produce from "immer";
import { generateSudoku, checkSolution, shareUrl } from "./lib/sudoku";
import SudokuBoard from "./components/SudokuBoard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku()
    }));
  }

  handleChange = e => {
    this.setState(
      produce(state => {
        const field = state.sudoku.rows[e.row].cols[e.col];
        field.value = e.value;
        if (!state.sudoku.solveTime && checkSolution(state.sudoku)) {
          state.sudoku.solveTime = new Date();
          state.sudoku.shareUrl = shareUrl(state.sudoku);
        }
      })
    );
  };

  handleSolve = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row => {
          row.cols.forEach(col => {
            col.value = state.sudoku.solution[col.row * 9 + col.col];
          });
        });
        if (!state.sudoku.solveTime && checkSolution(state.sudoku)) {
          state.sudoku.solveTime = new Date();
          state.sudoku.shareUrl = shareUrl(state.sudoku);
        }
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sudoku Chalenge</h1>
        </header>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />
        <button onClick={this.handleSolve}>Solve Magically</button>
      </div>
    );
  }
}

export default App;
