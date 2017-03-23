import React from "react";

class Json extends React.Component {
  constructor(props) {
    super(props);
  }
  getJson() {
    fetch("short.json")
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
  }
  render() {
    this.getJson();
    return (<div>JSON component</div>);
  }
}

export default Json;