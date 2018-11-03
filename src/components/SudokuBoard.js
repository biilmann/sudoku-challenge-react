import React, { Component } from "react";
import SudokuField from "./SudokuField";

function checkSolution(candidate, solution) {
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === null || candidate[i] !== solution[i]) {
      return false;
    }
  }
  return true;
}

export default class SudokuBoard extends Component {
  render() {
    const { sudoku } = this.props;
    const solved = checkSolution(
      sudoku.rows.map(row => row.cols.map(col => col.value)).flat(),
      sudoku.solution
    );
    return (
      <div className="board">
        {solved && <h2>You Solved the Sudoku!</h2>}
        {sudoku.rows.map(row => (
          <div className="row" key={row.index}>
            {row.cols.map(field => (
              <SudokuField
                field={field}
                onChange={this.props.onChange}
                key={field.col}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
