import React, { Component } from 'react';
import Header from "../shared/Header";
import Carousel from "./Carousel";
import CardsSection from "./CardsSection";
import Section from "./Section";
import TestimonialSection from "./TestimonialSection";

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Carousel sliderWidth="400" sliderHeight="250"/>
        <Section title="What we do?" section={<CardsSection/>}/>
        <Section title="Testimonials" section={<TestimonialSection/>} background={true}/>
      </div>
    );
  }
}

export default Home;
