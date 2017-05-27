import React, { Component } from 'react';

class FileView extends Component {
  render() {
    return (
      <div>
      <div className="row returnTo">
          <a href=""><i className="material-icons">keyboard_arrow_left</i> Return</a>
        </div>
        <div className="row fileInfo">
          <div className="col-4 sidebar-scene">
            <div className="sidebar-file-info">
              <h1 className="description-icon text-center"><i className="material-icons">description</i></h1>
            </div>
            <div className="sidebar-file-meta darker-bg">
              <div>
                <p className="text-center">.{this.props.currentExtension} | {this.props.currentFileSize}</p>
                <p className="text-center"><i className="material-icons">file_upload</i>{this.props.uploadTime}</p>
              </div>
            </div>
          </div>
          <div className="col-8 info-scene">
            <h1 className="hash-link text-center"><a href={this.props.gatewayLink} target="_blank">{this.props.currentHash}</a></h1>
            <button className="info-scene-btn" onClick={() => this.props.parent.getFile(this.props.currentHash)}>Download</button>
            <button className="info-scene-btn">Share</button>
          </div>
        </div>
        </div>
    );
  }
}

export default FileView;
