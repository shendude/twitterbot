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
    try {
      console.log(generate(10, this.totals, this.freqs, this.cards));
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    this.readCards();
    return (<div>JSON component</div>);
  }
}

export default Json;