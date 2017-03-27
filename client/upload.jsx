import React from "react";
import Dropzone from "react-dropzone";
import {myFilter, parseCards, parseBlob, parseLines} from "./parser.js";

class Upload extends React.Component {
  constructor(props) {
    super(props);
  }
  
  onDrop(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const sent = parseBlob(reader.result, myFilter);
      const markov = parseLines(sent);
    }
    reader.readAsText(file[0]);
  }
  
  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} accept="text/*" multiple={false} disableClick={true}>
          <div>Drop your txt file here</div>
        </Dropzone>
      </div>
    );
  }
}

export default Upload;