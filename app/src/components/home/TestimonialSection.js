import React from "react";

import "../../stylesheets/Testimonial.css"

function Testimonial(props) {
  return (
    <div className="testimonial">
      <blockquote className="testimonial__text">{props.text}</blockquote>
      <div className="testimonial__signing">
        <img className="testimonial__avatar" src={props.img} alt="ava"/>
        <p className="testimonial__name">{props.name}</p>
      </div>
    </div>
  )
}

export default function TestimonialSection() {
  return (
    <div className="section__content testimonials">
      <Testimonial text="I loved lorem and ipsum so much I can't even show it with words. And of course the amazing
                    dolor sit amet and other random words! I will choose Blue&Yellow every time I come to Ukraine now."
                   img="/ava_replace.png" name="Renata Dzherhalova"/>
      <Testimonial text="I loved lorem and ipsum so much I can't even show it with words. And of course the amazing
                    dolor sit amet and other random words! I will choose Blue&Yellow every time I come to Ukraine now."
                   img="/ava_replace1.png" name="Renàt Dzherhaloff"/>
    </div>
  )
}