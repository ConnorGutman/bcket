import React, { Component } from 'react';

class Options extends Component {
  render() {
    return (
      <div className={`col-12 sidebar-option ${this.props.name} ${this.props.isActive}`}>
        <a href="#" id="bees" onClick={this.props.toPage}>
          <div className="sidebar-button">
            <p><i className="material-icons">{this.props.icon}</i> {this.props.text}</p>
          </div>
        </a>
      </div>
    );
  }
}

export default Options;
