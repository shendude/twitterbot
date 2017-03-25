import React from "react";
import ReactDOM from "react-dom";

import Json from "./json.jsx";
import Upload from "./upload.jsx";

class App extends React.Component {
  render() {
    return (
      <div>
        <Json/>
        <Upload/>
      </div>
    );
  }
};


ReactDOM.render(<App/>, document.getElementById('app'));