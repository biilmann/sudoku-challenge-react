import React, { Component } from "react";

export default class SudokuField extends Component {
  handleChange = e => {
    const value = e.target.value === "" ? null : parseInt(e.target.value, 10);
    this.props.onChange({ ...this.props.field, value });
  };

  render() {
    const { field } = this.props;

    return (
      <input
        className="field"
        readOnly={field.readonly}
        value={field.value || ""}
        onChange={this.handleChange}
      />
    );
  }
}
