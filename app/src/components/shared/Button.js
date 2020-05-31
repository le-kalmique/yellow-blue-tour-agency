import React from "react";

export default function Button(props) {
  return (
    <button className="button" style={{backgroundColor: props.color, height: props.height, width: props.width}}>{props.val}</button>
  )
}