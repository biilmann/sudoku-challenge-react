import React, { Component } from "react";

export default class Result extends Component {
  render() {
    const { start, end } = this.props;
    return (
      <h2>
        You solved the sudoku in:{" "}
        {Math.floor((end.getTime() - start.getTime()) / 1000)} seconds
      </h2>
    );
  }
}
