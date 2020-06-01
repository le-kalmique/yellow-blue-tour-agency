import React, { Component } from 'react';

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
        if (res.status == 500 ) throw new Error("Error 500");
        else return res.json();
      })
      .then(tours =>
        resolve(tours)
      )
      .catch(err => reject(err));
  });
}



class ToursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      toursInfo: {}
    };
    this.filterCallback = this.filterCallback.bind(this);
  }

  filterCallback(data) {
    toursQuery(1, 5, data.searchQuery, data.city, data.minDate, data.maxDate)
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
    toursQuery(1, 5, "", [], "", "")
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
        {this.state.loading ? 'Loading...' :  'Tours'}
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