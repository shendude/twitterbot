import React from "react";
import Dropzone from "react-dropzone";

class Upload extends React.Component {
  constructor(props) {
    super(props);
  }
  
  onDrop(file) {
    console.log('file recieved', file);
  }
  
  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} accept="text/*" multiple={false} disableClick={true} accept="file">
          <div>Drop your txt file here</div>
        </Dropzone>
      </div>
    );
  }
}