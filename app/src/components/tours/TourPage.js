import React, { Component } from 'react';

import "../../stylesheets/Tour.css"
import Page404 from "../shared/Page404";
import Header from "../shared/Header";
import Section from "../home/Section";
import {TimePlace} from "./ToursPage";

function Tour(props) {
  return (
    <div className="tour-body">
      <img className="tour-body__image" alt="tour" src={props.tour.imgUrl}/>
      <div className="tour-body__content">
        <div className="tour-body__info">
          <TimePlace city={props.tour.city} date={props.tour.date} className="tour-body"/>
          <p className="tour-body__description">{props.tour.description}</p>
        </div>
        <span className="tour-body__places">Only <span className="tour-body__places-n">{props.tour.placesLeft}</span> places left!</span>
      </div>
    </div>
  )
}

export default class TourPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tour: {},
      found: true
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({loading: true});
    fetch(`http://localhost:4000/api/tours/${id}`)
      .then(res => {
        if (res.status === 500) throw new Error("Error 500");
        else if (res.status === 404) {
          this.setState({found: false});
          throw new Error("Error 404");
        }
        else return res.json();
      })
      .then(tour => this.setState({loading: false, tour: tour, found: true}))
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state)
    return (
      <div className="container">
        <Header/>
        <div className="tour-page">
          {!this.state.found && <Page404/>}
          {this.state.loading ? 'Loading...' :
            <Section title={this.state.tour.name} section={<Tour tour={this.state.tour}/>}/>
          }
        </div>
      </div>
    )
  }
}