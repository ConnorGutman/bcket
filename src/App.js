import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Core from './Core/Core';
import Downloads from './Downloads/Downloads';

class App extends Component {
  constructor() {
        super();
        this.state = {
            pageMode: 'upload',
            activePage: 'upload'
        };
        this.toUpload = this.toUpload.bind(this);
        this.toDownload = this.toDownload.bind(this);
        this.toSave = this.toSave.bind(this);
    }
    toUpload() {
      this.setState({
        pageMode: 'upload',
        activePage: 'upload'
      })
    }
    toDownload() {
      this.setState({
        pageMode: 'download',
        activePage: 'download'
      })
    }
    toSave() {
      this.setState({
        pageMode: 'save',
        activePage: 'save'
      })
    }

  render() {
    return (
      <div className="container">
        <div className="row" id="main-r">
          <Sidebar pageMode={this.state.pageMode} activePage={this.state.activePage} toUpload={this.toUpload} toDownload={this.toDownload} toSave={this.toSave} />
          <Core pageMode={this.state.pageMode} activePage={this.state.activePage} toUpload={this.toUpload} toDownload={this.toDownload} toSave={this.toSave} />
          <Downloads />
        </div>
      </div>
    );
  }
}

export default App;
