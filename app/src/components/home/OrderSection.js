import React from "react";
import Button from "../shared/Button";

import "../../stylesheets/Order.css"

export default function OrderSection() {
  return (
    <div className="section__content order">
      <Button val="Select your journey" width="15rem" height="3rem" color="yellow"/>
    </div>
  )
}