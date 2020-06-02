import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

import '../../stylesheets/Header.css'


class DesktopMenu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  componentDidMount() {
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem('jwt') !== null) {
        this.setState({loggedIn: true})
      }
    }
  }

  render() {
    return (
      <nav className="menu">
        <ol className={"menu__list"}>
          <li className="menu__item"><Link to={"/"}>Home</Link></li>
          <li className="menu__item"><Link to={"/tours"}>Tours</Link></li>
          <li className="menu__item">
            <Link to={"/account"}>Account</Link>
            {this.state.loggedIn ?
              <ol className="sub-menu">
                <li className="menu__item"><Link to={"/account"}>Profile</Link></li>
                <li className="menu__item"><Link to={"/account/calendar"}>My Calendar</Link></li>
                <li className="menu__item"><Link to={"/logout"}>Logout</Link></li>
              </ol>
              :
              <ol className="sub-menu">
                <li className="menu__item"><Link to={"/register"}>Register</Link></li>
                <li className="menu__item"><Link to={"/login"}>Login</Link></li>
              </ol>
            }

          </li>
          <li className="menu__item"><Link to={"/contacts"}>Contacts</Link></li>
        </ol>
      </nav>
    )
  }
}

function Logo(){
  return (
    <div className={"logo"}>
      <span className={"yellow"}>Blue</span>&<span className={"blue"}>Yellow</span>
    </div>
  )
}

export default function Header() {
  return (
    <header className={"header"}>
      <Logo/>
      <DesktopMenu/>
    </header>
  )
}
