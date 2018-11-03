import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0
    };
  }
  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          elapsed: new Date().getTime() - this.props.start.getTime()
        }),
      1000
    );
  }

  componentWillUnmount() {
    this.interval = null;
  }

  render() {
    return <h2>Seconds: {Math.floor(this.state.elapsed / 1000)}</h2>;
  }
}
