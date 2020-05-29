import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


// import io from 'socket.io-client';
// import OAuth from './OAuth';
// import { API_URL } from './config';

import './components/home/Home';
import Home from "./components/home/Home";
import ToursPage from "./components/tours/ToursPage";

// const socket = io(API_URL);
// const providers = ['google', 'github'];


class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/tours"><ToursPage/></Route>
          </Switch>
      </Router>
    );
  }
}

export default App;
