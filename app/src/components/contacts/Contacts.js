import React from "react";

import "../../stylesheets/Contacts.css"
import Header from "../shared/Header";
import Section from "../home/Section";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMapMarkerAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function Contacts() {
  return (
    <div className="contacts">
      <div className="contacts__content">
        <div className="contacts__personal">
          <div className="contacts__personal-block">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color={'blue'} className="contacts__icon"/>
            <span>15 Polytechnic st., Kyiv, Ukraine</span>
          </div>
          <div className="contacts__personal-block">
            <FontAwesomeIcon icon={faPhoneAlt} size="2x" color={'blue'} className="contacts__icon"/>
            <span>+38 (096) 289 28 78</span>
          </div>
          <div className="contacts__personal-block">
            <FontAwesomeIcon icon={faEnvelope} size="2x" color={'blue'} className="contacts__icon"/>
            <a href="mailto:rdzhergalova@gmail.com">rdzhergalova@gmail.com</a>
          </div>
        </div>
        <div className="contacts__icons">
          <Link to="https://t.me/@le_kalmique"><i className="fab fa-telegram-plane 4x contacts__icon"/></Link>
          <Link to="https://twitter.com/le_kalmique"><i className="fab fa-twitter 4x contacts__icon"/></Link>
          <Link to="https://www.facebook.com/renatadzherhalova/"><i className="fab fa-facebook 4x contacts__icon"/></Link>
          <Link to="https://github.com/le-kalmique/"><i className="fab fa-github 4x contacts__icon"/></Link>
        </div>
      </div>
      <div className="contacts__map">
        <iframe title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.648376318622!2d30.45448841561582!3d50.44764987947497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce9d7d09398d%3A0xa218cd21e7add3af!2z0JrQvtGA0L_Rg9GBIOKEljE1INCa0J_QhiDRltC8LtCG0LPQvtGA0Y8g0KHRltC60L7RgNGB0YzQutC-0LPQvg!5e0!3m2!1sen!2sua!4v1591051823113!5m2!1sen!2sua"
          width="700" height="400" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false"
          tabIndex="0"/>
      </div>
    </div>
  )
}

export default function ContactsPage() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Section title="Contacts" section={<Contacts/>}/>
      </div>
    </div>
  )
}