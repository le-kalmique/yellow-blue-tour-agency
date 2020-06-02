import React from "react";
import jwt from 'jwt-decode'
import Section from "../home/Section";
import Header from "../shared/Header";
import {Redirect} from "react-router";

import "../../stylesheets/Account.css";
import {Link} from "react-router-dom";

function Account(props) {
  return (
    <div className="account">
      <div className="account__content">
        <h3 className="account__title">{props.user.login}</h3>
        <div className="account__field">
          <span className="account__field-name">Email: </span><span>{props.user.email}</span>
        </div>
        <div className="account__field">
          <span className="account__field-name">Tours: </span>{props.user.tours && <span>{props.user.tours.length}</span>}
        </div>
      </div>
      <div className="account__info">
        <p className="account__paragraph">Order tours to discover this beautiful country</p>
        <Link to="/tours"><button className="account__btn">Tours</button></Link>
        <span className="account__or">or</span>
        <p className="account__paragraph">Look at your calendar with all your planned tours</p>
        <Link to="/account/calendar"><button className="account__btn">Calendar</button></Link>
      </div>
    </div>
  )
}

export default class AccountPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
      loggedIn: true
    }
  }
  componentDidMount() {
    this.setState({loading: true});
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem("jwt") === null) this.setState({loggedIn: false})
      else {
        const user = jwt(localStorage.getItem("jwt"));
        fetch(`http://localhost:4000/api/users/${user.id}`)
          .then(res => res.json())
          .then(user => {
            this.setState({user: user, loading: false});
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
        {this.state.loading ? 'Loading' :
          <div className="content">
            <Section title="Account" section={<Account user={this.state.user}/>}/>
          </div>
        }
      </div>
    );
  }
}