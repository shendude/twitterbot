import React from "react";
import Dropzone from "react-dropzone";

class Upload extends React.Component {
  constructor(props) {
    super(props);
  }
  
  onDrop(file) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    }
    reader.readAsText(file[0]);
    console.log('file recieved', file[0]);
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