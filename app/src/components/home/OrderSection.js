import React from "react";
import {Link} from "react-router-dom";

import "../../stylesheets/Order.css"

export default function OrderSection() {
  return (
    <div className="section__content order">
      <Link to="/tours"><button className="button">Select your Journey</button></Link>
    </div>
  )
}