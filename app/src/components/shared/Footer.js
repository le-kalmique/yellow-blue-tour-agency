import React from "react";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faPhoneAlt, faEnvelope} from "@fortawesome/free-solid-svg-icons";

import "../../stylesheets/Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__info">
        <div className="footer__logo">
          Blue&Yellow
        </div>
        <nav className="footer__nav">
          <Link to={"/"} className={"a1"}>Home</Link>
          <Link to={"/tours"}>Tours</Link>
          <Link to={"/contacts"}>Contacts</Link>
        </nav>
        <p className="footer__author">Renata Dzherhalova © 2020</p>
      </div>
      <div className="footer__contacts">
        <div className="footer__contact-block">
          <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color={'white'} className="footer__icon"/>
          <span>15 Polytechnic st., Kyiv, Ukraine</span>
        </div>
        <div className="footer__contact-block">
          <FontAwesomeIcon icon={faPhoneAlt} size="2x" color={'white'} className="footer__icon"/>
          <span>+38 (096) 289 28 78</span>
        </div>
        <div className="footer__contact-block">
          <FontAwesomeIcon icon={faEnvelope} size="2x" color={'white'} className="footer__icon"/>
          <a href="mailto:rdzhergalova@gmail.com">rdzhergalova@gmail.com</a>
        </div>
      </div>
      <div className="footer__links">
        <p className="footer__about">
          <h4 className="footer__about-title">About Us</h4>
          This is a dummy website of a tour agency created as a student project.
        </p>
        <div className="footer__icons">
          <Link to="https://t.me/@le_kalmique"><i className="fab fa-telegram-plane 3x icon"/></Link>
          <Link to="https://twitter.com/le_kalmique"><i className="fab fa-twitter 3x icon"/></Link>
          <Link to="https://www.facebook.com/renatadzherhalova/"><i className="fab fa-facebook 3x icon"/></Link>
          <Link to="https://github.com/le-kalmique/"><i className="fab fa-github 3x icon"/></Link>
        </div>
      </div>
    </footer>
  )
}