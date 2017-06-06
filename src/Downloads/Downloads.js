import React, { Component } from 'react';
import Heading from './Heading.js';
import DownloadHistory from './DownloadHistory.js';

class Downloads extends Component {
  render() {
    return (
      <div className="hidden-s-down" id="downloads">
        <Heading />
        <DownloadHistory />
      </div>
    );
  }
}

export default Downloads;
