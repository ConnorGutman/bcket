import React, { Component } from 'react';

class FileUpload extends Component {
  constructor() {
    super();
    this.boxClick = this.boxClick.bind(this)
  }
  boxClick() {
    document.getElementById("fileUploadInput").click();
  }
  render() {
    return (
      <div id="uploadSection">
        <div className="dropzone_box" onClick={this.boxClick}>
          <p className="text-center"><i className="material-icons">description</i></p>
        </div>
        <form id="captureMedia" onSubmit={this.props.parent.handleSubmit}>
          <input type="file" id="fileUploadInput" onChange = {this.props.parent.captureFile} />
        </form >
      </div>
    );
  }
}

export default FileUpload;
