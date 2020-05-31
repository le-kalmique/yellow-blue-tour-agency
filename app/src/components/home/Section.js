import React, { Component } from 'react';

import "../../stylesheets/Section.css";

function SectionTitle(props) {
  return (
    <h2 className="section__title">{props.text}</h2>
  )
}

export default class Section extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    let className = "section";
    if (this.props.background) className += " background_grey"
    return (
      <div className={className}>
        <SectionTitle text={this.props.title}/>
        {this.props.section}
      </div>
    );
  }
}
