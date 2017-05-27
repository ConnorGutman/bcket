import React, { Component } from 'react';

class NodeStats extends Component {
  render() {
    return (
      <pre className="hidden">{this.props.Stats}</pre>
    );
  }
}

export default NodeStats;
