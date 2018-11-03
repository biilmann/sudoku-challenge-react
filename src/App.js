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
    solution: generator.solvepuzzle(raw),
    startTime: new Date(),
    curTime: new Date()
  };
  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };
    for (let j = 0; j < 9; j++) {
      row.cols[j] = {
        row: i,
        col: j,
        readonly: raw[i * j] !== null,
        value: raw[i * j]
      };
    }
    result.rows.push(row);
  }
  console.log(result);
  return result;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku()
    }));
  }

  handleChange = e => {
    console.log(this.state);
    this.setState(
      produce(state => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;
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
      </div>
    );
  }
}

export default App;
