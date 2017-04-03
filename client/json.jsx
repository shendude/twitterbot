import React from "react";
import generate from "./bot.js";

class Json extends React.Component {
  constructor(props) {
    super(props);
    this.cards = {};
    this.freqs = {};
    this.totals = {};
    this.state = {sent: "", loaded: false};
    this.generateSentence = this.generateSentence.bind(this);
  }
  readCards() {
    fetch("mycards.json")
      .then(res => res.json())
      .then(json => {
        this.cards = json;
      });
  }
  componentWillReceiveProps(newProps) {
    this.freqs = newProps.data.freqs;
    this.totals = newProps.data.totals;
    this.setState({loaded: true});
    this.generateSentence();
  }
  generateSentence() {
    try {
      let sent = generate(10, this.totals, this.freqs, this.cards);
      sent = sent.slice(1).join(' ');
      this.setState({sent: sent});
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    this.readCards();
    let button = null;
    if (this.state.loaded) {
      button = <button onClick={this.generateSentence}>Generate!</button>;
    }
    return (
      <div id="results">
        <div id="sentence">{this.state.sent}</div>
        {button}
      </div>
    );
  }
}

export default Json;