import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './components/home/Home';
import Home from "./components/home/Home";
import ToursPage from "./components/tours/ToursPage";
import TourPage from "./components/tours/TourPage";
import ContactsPage from "./components/contacts/Contacts";

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path='/tours/:id' component={TourPage}/>
            <Route path="/tours"><ToursPage/></Route>
            <Route path="/contacts"><ContactsPage/></Route>
          </Switch>
      </Router>
    );
  }
}

export default App;
