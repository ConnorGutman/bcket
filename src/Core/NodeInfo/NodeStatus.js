import React, { Component } from 'react';

class NodeStatus extends Component {
  render() {
    return (
      <i className={`material-icons node_status ${this.props.offOn}`} id="status">{this.props.offOn}</i>
    );
  }
}

export default NodeStatus;
