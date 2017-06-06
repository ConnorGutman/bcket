import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Core from './Core/Core';
import Downloads from './Downloads/Downloads';

class App extends Component {
  constructor() {
        super();
        this.state = {
            mobileToggle: 'hidden-menu',
            pageMode: 'upload',
            activePage: 'upload'
        };
        this.menuToggle = 0;
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.toUpload = this.toUpload.bind(this);
        this.toDownload = this.toDownload.bind(this);
        this.toSave = this.toSave.bind(this);
    }
    toggleMobileMenu() {
      if(this.menuToggle == 0) {
      this.setState({
        mobileToggle: ``
      })
      this.menuToggle = 1;
    } else {
      this.setState({
        mobileToggle: `hidden-menu`
      })
      this.menuToggle = 0;
    }
    }
    toUpload() {
      this.setState({
        pageMode: 'upload',
        activePage: 'upload'
      })
      this.toggleMobileMenu()
    }
    toDownload() {
      this.setState({
        pageMode: 'download',
        activePage: 'download'
      })
      this.toggleMobileMenu()
    }
    toSave() {
      this.setState({
        pageMode: 'save',
        activePage: 'save'
      })
      this.toggleMobileMenu()
    }

  render() {
    return (
      <div className="container">
        <div className="row" id="main-r">
          <Sidebar mobileToggle={this.state.mobileToggle} toggleMobileMenu={this.toggleMobileMenu} pageMode={this.state.pageMode} activePage={this.state.activePage} toUpload={this.toUpload} toDownload={this.toDownload} toSave={this.toSave} />
          <Core pageMode={this.state.pageMode} activePage={this.state.activePage} toUpload={this.toUpload} toDownload={this.toDownload} toSave={this.toSave} />
          <Downloads />
        </div>
      </div>
    );
  }
}

export default App;
