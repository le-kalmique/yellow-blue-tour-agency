import React, { Component } from 'react';
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faCalendarAlt, faClock} from "@fortawesome/free-solid-svg-icons";


import Header from "../shared/Header";
import "../../stylesheets/Tours.css";
import Section from "../home/Section";
import FilterMenu from "./ToursFilter";

function toursQuery(pageN, perPage, searchQ, city, minDate, maxDate) {
  return new Promise((resolve, reject) => {
    let citiesQ = "";
    city.forEach(city => {
      citiesQ += `city[]=${city}&`;
    })
    let q = `page=${pageN}&limit=${perPage}&search=${searchQ}` +
      `&${citiesQ}minDate=${minDate}&maxDate=${maxDate}`
    console.log(q)
    fetch(`http://localhost:4000/api/tours?page=${pageN}&limit=${perPage}&search=${searchQ}` +
              `&${citiesQ}minDate=${minDate}&maxDate=${maxDate}`)
      .then(res => {
        if (res.status === 500 ) throw new Error("Error 500");
        else return res.json();
      })
      .then(tours =>
        resolve(tours)
      )
      .catch(err => reject(err));
  });
}

class TourCard extends Component {
  render() {
    return (
      <div className="tour">
        <img className="tour__image" src={this.props.tour.imgUrl} alt="image"/>
        <div className="tour__content">
          <h3 className="tour__title">{this.props.tour.name}</h3>
          <div className="tour__info">
            <div className="tour__time-place">
              <div className="tour__place">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" className="tour__icon"/>
                {this.props.tour.city}
              </div>
              <div className="tour__date">
                <FontAwesomeIcon icon={faCalendarAlt} size="1x" className="tour__icon"/>
                <span>{(new Date(this.props.tour.date)).toLocaleDateString()}</span>
              </div>
              <div className="tour__time">
                <FontAwesomeIcon icon={faClock} size="1x" className="tour__icon"/>
                <span>{(new Date(this.props.tour.date)).toLocaleTimeString().slice(0, 5)}</span>
              </div>
            </div>
            <p className="tour__description">
              {this.props.tour.description}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

class ToursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      toursInfo: {}
    };
    this.filterCallback = this.filterCallback.bind(this);
  }

  filterCallback(data) {
    toursQuery(1, 6, data.searchQuery, data.city, data.minDate, data.maxDate)
      .then(tours => {
        if (tours.status === 500) throw new Error("Error 500");
        else {
          this.setState({loading: false, toursInfo: tours});
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.setState({loading: true});
    toursQuery(1, 6, "", [], "", "")
      .then(tours => {
          this.setState({
            toursInfo: tours,
            loading: false
          });
      })
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.toursInfo)
    return(
      <div className={"section__content tours"}>
        <FilterMenu parentCallback={this.filterCallback}/>
        {this.state.loading ? 'Loading...' :  this.state.toursInfo.tours.map((tour, i) =>
          <Link to={`/tours/${tour._id}`} key={i}>
            <TourCard tour={tour}/>
          </Link>
        )}
      </div>
    )
  }
}

class ToursPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Section title={"Our Tours"} section={<ToursList/>}/>
        </div>
      </div>
    );
  }
}

export default ToursPage;