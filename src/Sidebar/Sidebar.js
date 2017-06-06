import React, { Component } from 'react';
import Heading from './Heading';
import Options from './Options';
import Ad from './Ad';
import Footer from './Footer';

class Sidebar extends Component {
  render() {
    return (
      <div className="col-3 col-s-12 sidebar">
        <Heading toggleMobileMenu={this.props.toggleMobileMenu}  />
        <div className={`sidebar-content ${this.props.mobileToggle}`}>
          <Options name={'transfer'} isActive={this.props.activePage == 'upload' ? 'active' : ''} icon={'swap_horiz'} text={'Upload'} toPage={this.props.toUpload} />
          <Options name={'download'} isActive={this.props.activePage == 'download' ? 'active' : ''} icon={'file_download'} text={'Download'} toPage={this.props.toDownload} />
          <Options name={'save'} isActive={this.props.activePage == 'save' ? 'active' : ''} icon={'cloud_done'} text={'Save'} toPage={this.props.toSave} />
          <Ad />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Sidebar;
