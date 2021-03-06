import React, { Component } from 'react';

class FileDownload extends Component {
  constructor() {
    super();
    this.state = {
        currentHash: ''
    };

    this.updateInputValue = this.updateInputValue.bind(this)
    this.downloadFromHash = this.downloadFromHash.bind(this)
  }

  updateInputValue(evt) {
    this.setState({
      currentHash: evt.target.value
    });
    console.log(this.state.currentHash)
  }

  downloadFromHash(event) {
    event.preventDefault();
    this.props.parent.downloadFile(this.state.currentHash);
  }

  render() {
    return (
      <div className="downloadSection">
      <h1 className="text-center"><i className="material-icons">find_in_page</i></h1>
      <form id="findFile" onSubmit={() => {this.downloadFromHash(event)}}>
        <input id="hashBox" type="text" placeholder="Enter file hash." onChange={evt => this.updateInputValue(evt)} />
        <button className="download-btn" type="submit"><i className="material-icons">file_download</i></button>
      </form>
      </div>
    );
  }
}

export default FileDownload;
