import React from "react";
import ReactDOM from "react-dom";

import Json from "./json.jsx";

class App extends React.Component {
  render() {
    return (
      <div>
        fucking works
        <Json/>
      </div>
    );
  }
};


ReactDOM.render(<App/>, document.getElementById('app'));