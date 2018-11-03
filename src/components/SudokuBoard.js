import React, { Component } from "react";
import SudokuField from "./SudokuField";
import Timer from "./Timer";
import Result from "./Result";

export default class SudokuBoard extends Component {
  render() {
    const { sudoku } = this.props;
    return (
      <div className="board">
        {sudoku.solveTime ? (
          <Result start={sudoku.startTime} end={sudoku.solveTime} />
        ) : (
          <Timer start={sudoku.startTime} />
        )}
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
