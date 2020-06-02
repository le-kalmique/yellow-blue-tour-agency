import React from "react";
import {Redirect} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import Header from "../shared/Header";
import Section from "../home/Section";

import "../../stylesheets/Form.css";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      login: "",
      email: "",
      password: "",
      password2: "",
      match: false,
      errors: {
        exists: false
      },
      registered: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePassword2Change = this.handlePassword2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleLoginChange(event) {
    this.setState({login: event.target.value});
  }
  handlePassword2Change(event) {
    this.setState({password2: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.login < 3 || this.state.password < 6 || this.state.password !== this.state.password2) return;
    const regData = {login: this.state.login, email: this.state.email, password: this.state.password}
    fetch('http://localhost:4000/api/users/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(regData)
    })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 400) {
          this.setState({errors: {exists: true}});
          throw new Error("404");
        }
      })
      .then(res => {
        this.setState({registered: true});
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
      <div className="register">
        {this.state.registered && <Redirect to={"/login"}/>}
        <div className="register__image-block">
          <img className="register__image" src="https://cdn.pixabay.com/photo/2016/03/26/22/55/mountains-1281719_1280.jpg" alt="register"/>
          <span className="register__text">Discover Ukraine</span>
        </div>
        <form className="form register__form" onSubmit={this.handleSubmit}>
          <FontAwesomeIcon icon={faUserCircle} className="form__icon"/>
          <div className="form__box">
            <label className="form__label" htmlFor="login">login
              <span className="form__error">3 symbols or more</span>
            </label>
            <input className="form__input" id="login" minLength={3} type="text" placeholder="Enter login"
                   onChange={this.handleLoginChange} autoComplete="off"/>
          </div>
          <div className="form__box">
            <label className="form__label" htmlFor="email">e-mail
              <span className="form__error">Valid email</span>
            </label>
            <input className="form__input" id="email" type="email" placeholder="Enter e-mail"
                   onChange={this.handleEmailChange} autoComplete="off"/>
          </div>
          <div className="form__box">
            <label className="form__label" htmlFor="password">password
              <span className="form__error">6 symbols or more</span>
            </label>
            <input className="form__input" id="password" minLength={6} type="password" placeholder="Enter password"
                   onChange={this.handlePasswordChange} autoComplete="off"/>
          </div>
          <div className="form__box">
            <label className="form__label" htmlFor="password2">repeat password
              <span className="form__error">Match passwords</span>
            </label>
            <input className="form__input" id="password2" type="password" placeholder="Repeat password"
                   onChange={this.handlePassword2Change} autoComplete="off"/>
          </div>
          <button type="submit" className="form__button">Submit</button>
        </form>
      </div>
    )
  }
}

export default class RegisterPage extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Section title="Register" section={<Register/>}/>
        </div>
      </div>
    )
  }
}