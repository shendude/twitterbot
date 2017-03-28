import React from "react";
import Dropzone from "react-dropzone";
import {myFilter, parseCards, parseBlob, parseLines} from "./parser.js";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Ready"
    };
    this.onDrop.bind(this);
  }
  
  onDrop(file) {
    this.setState({status: "Loading"});
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({status: "Reading"});
      const sent = parseBlob(reader.result, myFilter);
      const markov = parseLines(sent);
      this.setState({status: "Ready"});
      this.props.onUpdate(markov);
    }
    reader.readAsText(file[0]);
  }
  
  render() {
    return (
      <div>
        <div>Status: {this.state.status}</div>
        <Dropzone onDrop={this.onDrop} accept="text/*" multiple={false} disableClick={true}>
          <div>Drop your txt file here</div>
        </Dropzone>
      </div>
    );
  }
}

export default Upload;