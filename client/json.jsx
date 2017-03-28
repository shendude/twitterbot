import React from "react";
import generate from "./bot.js";

class Json extends React.Component {
  constructor(props) {
    super(props);
    this.cards = {};
    this.freqs = {};
    this.totals = {};
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
  }
  render() {
    this.readCards();
    return (<div>JSON component</div>);
  }
}

export default Json;