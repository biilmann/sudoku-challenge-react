import React, { Component } from "react";

export default class ChallengeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      sender: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onChallenge(this.state);
  };

  render() {
    if (this.props.challengeSent) {
      return <h2>Challenge Sent!</h2>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Challenge a friend!</h2>
        <p>Send a challenge to someone, and see if they can beat your time:</p>
        <p>
          <label>
            Your Name:{" "}
            <input
              value={this.state.sender}
              name="sender"
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Your Email:{" "}
            <input
              value={this.state.from}
              name="from"
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Your friends email:{" "}
            <input
              value={this.state.to}
              name="to"
              onChange={this.handleChange}
            />
          </label>
        </p>
        <p>
          <button>Send the challenge!</button>
        </p>
      </form>
    );
  }
}
