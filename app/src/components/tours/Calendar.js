import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import jwt from 'jwt-decode';

import "../../stylesheets/Calendar.css";
import Header from "../shared/Header";
import {Redirect} from "react-router";
import Section from "../home/Section";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      events: []
    }
  }

  componentDidMount() {
    if (typeof Storage !== "undefined")
    {
      if (localStorage.getItem("jwt") === null) this.setState({loggedIn: false})
      else {
        fetch(`http://localhost:4000/api/users/${jwt(localStorage.getItem("jwt")).id}/tours`)
          .then(res => {
            if (res.status === 500) throw new Error("Error 500");
            return res.json();
          })
          .then(tours => {
            console.log(tours)
            const events = [];
            tours.forEach(tour => {
              events.push({title: tour.name, start: tour.date, url: `/tours/${tour._id}`});
            })
            this.setState({events: events});
          })
          .catch(err => console.log(err));
      }
    }
  }
  render() {
    return (
      <div className="wrapper">
        {!this.state.loggedIn && <Redirect to="/login"/>}
        <Header/>
        <div className="content calendar">
          <Section title="My Calendar" section={<FullCalendar plugins={[ dayGridPlugin, listPlugin ]}
              eventSources={[{
            events: this.state.events,
            color: 'yellow',
            textColor: 'black'
          }]} height={600} aspectRatio="4"
          firstDay={1}
          defaultView={window.innerWidth < 900 ? "listYear" : "dayGridMonth"}
          />
          }/>
        </div>
      </div>
    )
  }
}