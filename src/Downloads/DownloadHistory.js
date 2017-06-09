import React, { Component } from 'react';

class DownloadHistory extends Component {
  constructor() {
    super()
    this.closeDownloads = this.closeDownloads.bind(this)
  }
  closeDownloads() {
    document.getElementById("downloads").className = "tada";
  }
  render() {
    return (
      <div className="col-12 downloads-history">
          <div className="downloads-history-inner" id="History">
            <p onClick={this.closeDownloads}><i className="material-icons">clear</i></p>
            <h1><i className="material-icons">file_download</i></h1>
          </div>
      </div>
    );
  }
}

export default DownloadHistory;
