import React from "react";

import Section from "../home/Section";
import Header from "../shared/Header";

import "../../stylesheets/Form.css";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Redirect} from "react-router";


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: false,
        password: false
      },
      loggedIn: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    const loginData = {email: this.state.email, password: this.state.password}
    fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData)
    })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 404) {
          this.setState({errors: {email: true}});
          throw new Error("404");
        }
        if (res.status === 400) {
          this.setState({errors: {password: true}});
          throw new Error("400");
        }
      })
      .then(res => {
        if (typeof Storage !== "undefined") {
          localStorage.setItem( 'jwt', res.user.token );
        }
        this.setState({loggedIn: true, errors: {email: false, password: false}});
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem( 'jwt') !== null)
        this.setState({loggedIn: true})
    }
  }

  render() {
    return (
      <div className="login">
        {this.state.loggedIn && <Redirect to={"/tours"}/>}
        <form className="form login__form" onSubmit={this.handleSubmit}>
          <FontAwesomeIcon icon={faSignInAlt} className="form__icon"/>
          <div className="form__box">
            <label className="form__label" htmlFor="email">e-mail</label>
            <input className="form__input" id="email" type="email" placeholder="Enter your e-mail"
                   onChange={this.handleEmailChange} autoComplete="off"/>
          </div>
          <div className="form__box">
            <label className="form__label" htmlFor="password">password</label>
            <input className="form__input" id="password" type="password" placeholder="Enter your password"
                   onChange={this.handlePasswordChange} autoComplete="off"/>
          </div>
          <button type="submit" className="form__button">Submit</button>
        </form>
        <div className="login__image-block">
          <img className="login__image" src="https://cdn.pixabay.com/photo/2017/04/18/13/26/landscape-2239074_1280.jpg" alt="login"/>
          <span className="login__text">Discover Ukraine</span>
        </div>
      </div>
    )
  }
}

export default function LoginPage() {
   return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Section title="Login" section={<LoginForm/>}/>
        </div>
      </div>
   );
}