import React from "react";
import Dropzone from "react-dropzone";
import {myFilter, parseCards, parseBlob, parseLines} from "./parser.js";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  
  onDrop(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const sent = parseBlob(reader.result, myFilter);
      const markov = parseLines(sent);
      this.props.onUpdate(markov);
    }
    reader.readAsText(file[0]);
  }
  
  render() {
    return (
      <div id="drop">
        <Dropzone onDrop={this.onDrop} accept="text/*" multiple={false} disableClick={true}>
          <div id="dropText">Drop sherlock holmes here</div>
        </Dropzone>
      </div>
    );
  }
}

export default Upload;