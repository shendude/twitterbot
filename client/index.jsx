import React from "react";
import ReactDOM from "react-dom";

import Json from "./json.jsx";
import Upload from "./upload.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false
    };
    this.onUpdate = this.onUpdate.bind(this);
  }
  
  onUpdate(data) {
    this.setState({data: data});
  }
  
  render() {
    return (
      <div>
        <Upload onUpdate={this.onUpdate}/>
        <Json data={this.state.data}/>
      </div>
    );
  }
};


ReactDOM.render(<App/>, document.getElementById('app'));