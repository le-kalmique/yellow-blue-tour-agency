import React, { Component } from 'react';

import Menu from "../shared/Header";

class ToursPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <Menu/>
        <h1>Tours</h1>
      </div>
    );
  }
}

export default ToursPage;