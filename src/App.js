import React, { Component } from "react";
import produce from "immer";
import generator from "sudoku";
import SudokuBoard from "./components/SudokuBoard";
import "./App.css";

/*
  Generates a sudoku in this format:

  {
    rows: [{index: 0, cols: [{value: 1, readonly: 1, row: 0, col: 0}, ...]}, ...],
    solution: [0, 1, ...],
    startTime: Date
  }
*/
function generateSudoku() {
  const raw = generator.makepuzzle();
  const result = {
    rows: [],
    solution: generator.solvepuzzle(raw).map(number => number + 1),
    startTime: new Date(),
    solveTime: null
  };
  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };
    for (let j = 0; j < 9; j++) {
      const value = raw[i * 9 + j];
      const hasValue = value !== null;
      row.cols[j] = {
        row: i,
        col: j,
        readonly: hasValue,
        value: hasValue ? value + 1 : null,
        valid: hasValue
      };
    }
    result.rows.push(row);
  }
  return result;
}

function checkSolution(sudoku) {
  const candidate = sudoku.rows
    .map(row => row.cols.map(col => col.value))
    .flat();
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === null || candidate[i] !== sudoku.solution[i]) {
      return false;
    }
  }
  return true;
}

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
