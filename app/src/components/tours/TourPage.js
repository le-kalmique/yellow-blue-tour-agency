import React, { Component } from 'react';
import jwt from 'jwt-decode';

import "../../stylesheets/Tour.css"
import Page404 from "../shared/Page404";
import Header from "../shared/Header";
import Section from "../home/Section";
import {TimePlace} from "./ToursPage";
class Tour extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      ordered: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    if (window.confirm("Are you sure about this order?"))
    {
      fetch(`http://localhost:4000/api/users/${jwt(localStorage.getItem('jwt')).id}/order/${this.props.tour._id}`)
        .then(res => {
          if (res.status === 500) throw new Error("Error 500")
          else this.setState({ordered: true})
        })
    }
  }
  componentDidMount() {
    if (typeof Storage !== "undefined" && localStorage.getItem("jwt") !== null)
    {
      this.setState({loggedIn: true})
      fetch(`http://localhost:4000/api/users/${jwt(localStorage.getItem("jwt")).id}`)
        .then(res => {
          if (res.status === 500) throw new Error("Error 500")
          else return res.json();
        })
        .then(user => {
          if (user.tours.includes(this.props.tour._id)) this.setState({ordered: true});
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div className="tour-body">
        <img className="tour-body__image" alt="tour" src={this.props.tour.imgUrl}/>
        <div className="tour-body__content">
          <div className="tour-body__info">
            <TimePlace city={this.props.tour.city} date={this.props.tour.date} className="tour-body"/>
            <p className="tour-body__description">{this.props.tour.description}</p>
          </div>
          <span className="tour-body__places">Only <span className="tour-body__places-n">{this.props.tour.placesLeft}</span> places left!</span>
          {(this.state.loggedIn && !this.state.ordered) && <button className="tour-body__btn" onClick={this.handleClick}>Order Now!</button>}
          {this.state.ordered && 'Ordered!'}
        </div>
      </div>
    )
  }
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