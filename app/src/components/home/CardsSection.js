import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadset, faSmile, faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import "../../stylesheets/Cards.css";

function Card(props) {
  return (
    <div className="card">
      <span className="dot"/>
      {props.icon}
      <h3 className="card__title">{props.title}</h3>
      <div className="card__text">{props.text}</div>
    </div>
  );
}

export default function CardsSection(props) {
  return (
    <div className="section__content cards">
      <Card icon={<FontAwesomeIcon icon={faSmile} className="card__icon" size="2x"/>} title="Amazing Tours" text="Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore..."/>
      <Card icon={<FontAwesomeIcon icon={faHeadset} className="card__icon" size="2x"/>} title="Premium Support" text="Lorem ipsum dolor sit amet,
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore..."/>
      <Card icon={<FontAwesomeIcon icon={faUserGraduate} className="card__icon" size="2x"/>} title="Student Discounts" text="Lorem ipsum dolor sit amet,
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore..."/>
    </div>
  )
}
