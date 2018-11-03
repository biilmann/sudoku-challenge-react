import React, { Component } from "react";
import SudokuField from "./SudokuField";

export default class SudokuBoard extends Component {
  render() {
    return (
      <div className="board">
        {this.props.sudoku.rows.map(row => (
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
