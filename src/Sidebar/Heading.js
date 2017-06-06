import React, { Component } from 'react';

class Heading extends Component {
  render() {
    return (
      <div className="col-12 header dark-bg">
        <i className="material-icons" id="mobileMenu" onClick={this.props.toggleMobileMenu}>menu</i>
        <p className="text-center"><img src="./public/logo.svg" />Bcket</p>
      </div>
    );
  }
}

export default Heading;
