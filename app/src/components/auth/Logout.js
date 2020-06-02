import React from "react";
import {Redirect} from "react-router";
import Header from "../shared/Header";

export default class Logout extends React.Component {
  componentDidMount() {
    if (typeof Storage !== "undefined")
    {
      localStorage.removeItem("jwt");
      this.setState({redirect: true});
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <Redirect to="/"/>
      </div>
    );
  }
}