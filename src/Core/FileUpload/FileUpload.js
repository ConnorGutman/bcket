import React, { Component } from 'react';

class FileUpload extends Component {
  render() {
    return (
      <div id="uploadSection">
        <div className="dropzone_box">
          <p className="text-center"><i className="material-icons">description</i></p>
        </div>
        <form id="captureMedia" onSubmit={this.props.parent.handleSubmit}>
          <input type="file" onChange = {this.props.parent.captureFile} />
        </form >
      </div>
    );
  }
}

export default FileUpload;
