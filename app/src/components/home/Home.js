import React, { Component } from 'react';
import Header from "../shared/Header";
import Carousel from "./Carousel";

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Carousel sliderWidth="400" sliderHeight="250"/>
      </div>
    );
  }
}

export default Home;
