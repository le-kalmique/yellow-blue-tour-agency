import React, { Component } from 'react';
import Header from "../shared/Header";
import Carousel from "./Carousel";
import CardsSection from "./CardsSection";
import Section from "./Section";
import TestimonialSection from "./TestimonialSection";
import GallerySection from "./GallerySection";
import OrderSection from "./OrderSection";

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Carousel sliderWidth="400" sliderHeight="250"/>
        <Section title="What we do?" section={<CardsSection/>}/>
        <Section title="Testimonials" section={<TestimonialSection/>} background={true}/>
        <Section title="Gallery" section={<GallerySection/>}/>
        <Section section={<OrderSection/>}/>
      </div>
    );
  }
}

export default Home;
