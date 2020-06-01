import React, { Component } from 'react';

import "../../stylesheets/Section.css";

export function SectionTitle(props) {
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
        {this.props.title !== undefined &&
          <SectionTitle text={this.props.title}/>
        }
        {this.props.section}
      </div>
    );
  }
}
