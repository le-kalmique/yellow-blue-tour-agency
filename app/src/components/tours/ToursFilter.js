import React, {Component} from "react";
import "../../stylesheets/Filter.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";


export class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenPage: 1
    }
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.sendPage = this.sendPage.bind(this);
  }
  sendPage() {
    this.props.parentCallback(this.state.chosenPage);
  }
  handleRightClick(event) {
    if (this.state.chosenPage !== this.props.pagesNum) {
      const nextPage = this.state.chosenPage + 1;
      this.setState({chosenPage: nextPage}, this.sendPage);
    }
  }
  handleLeftClick(event) {
    if (this.state.chosenPage !== 1)
    {
      const prevPage = this.state.chosenPage - 1;
      this.setState({chosenPage: prevPage}, this.sendPage);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.pagesNum !== this.props.pagesNum)
    {
      this.setState({chosenPage: 1})
    }
  }

  render() {
    return (
      <div className="pagination">
        <button className="pagination__arrow-btn" disabled={this.state.chosenPage === 1} onClick={this.handleLeftClick}>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </button>
        <span>{this.state.chosenPage}</span>/<span>{this.props.pagesNum !== undefined ? this.props.pagesNum : '...'}</span>
        <button className="pagination__arrow-btn" disabled={this.state.chosenPage === this.props.pagesNum} onClick={this.handleRightClick}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </button>
      </div>
    )
  }
}

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendToFilter = this.sendToFilter.bind(this);
  }
  sendToFilter(data) {
    this.props.parentCallback(data);
  }
  handleChange(event) {
    this.setState({name: event.target.value});
    this.sendToFilter(event.target.value);
  }
  render() {
    return (
      <form role="search" className="search" autoComplete="off">
        <input
          placeholder="Enter tour name..."
          autoFocus
          type="search"
          name="name"
          maxLength="90"
          className="search__input"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

class CheckboxBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesAll: [],
      loading: false,
      chosenCities: []
    }
    this.onChange = this.onChange.bind(this);
    this.setCities = this.setCities.bind(this);
    this.sendToFilter = this.sendToFilter.bind(this);
  }
  sendToFilter() {
    this.props.parentCallback(this.state.chosenCities);
  }
  onChange(event) {
    const cities = this.state.chosenCities;
    const all = this.state.citiesAll;
    if (event.target.checked) {
      all[all.findIndex(city => city.city === event.target.value)].chosen = true;
      cities.push(event.target.value);
    }
    else for(let i = 0; i < cities.length; i++) {
      all[all.findIndex(city => city.city === event.target.value)].chosen = false;
      if (cities[i] === event.target.value) cities.splice(i, 1);
    }
    // all[all.findIndex(city => city === event.target.value)].chosen = true;
    this.setState({chosenCities: cities, citiesAll: all}, this.sendToFilter);
  }
  setCities(name) {
    fetch(`http://localhost:4000/api/tours/cities?name=${name}`)
      .then(res => res.json())
      .then(cities => {
        let allInputs = [];
        cities.forEach(city => {
          allInputs.push({
            city: city,
            chosen: false
          })
        })
        let chosen = this.state.chosenCities;
        for (let i = 0; i < chosen.length; i++)
        {
          if (!cities.includes(chosen[i])) {
            chosen.splice(i, 1);
            i--;
          }
          else {
            allInputs[cities.findIndex((city) => city === chosen[i])].chosen = true;
          }
        }
        this.setState({citiesAll: allInputs, loading: false, chosenCities: chosen})
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.setState({loading: true});
    this.setCities(this.props.searchQ);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.searchQ !== prevProps.searchQ){
      this.setState({loading: true})
      this.setCities(this.props.searchQ)
    }
  }
  render() {
    return (
      <div className="checkbox-block">
        {this.state.citiesAll.map((city, i) =>
          <label className="checkbox-block__item" key={i}>{city.city}
            <input name={`city-${city.city}`} className="checkbox-block__input" checked={city.chosen} type="checkbox" onChange={this.onChange} value={city.city}/>
            <span className="checkbox-block__checkmark"/>
          </label>
        )}
      </div>
    )
  }
}

class SideMenuBlock extends Component {
  render() {
    return (
      <div className="side-menu__block">
        <h4 className="side-menu__block-title">{this.props.title}</h4>
        {this.props.block}
      </div>
    )
  }
}

export class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: "",
      maxDate: "",
      searchQuery: "",
      city: []
    }

    this.searchCallback = this.searchCallback.bind(this);
    this.cityCallback = this.cityCallback.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData() {
    this.props.parentCallback(this.state)
  }
  searchCallback(data) {
    this.setState({
      searchQuery: data
    }, this.fetchData)
  }
  cityCallback(data) {
    this.setState({
      city: data
    }, this.fetchData)
  }
  render() {
    return (
      <div className="filter">
        <button className="filter__button">Search</button>
        <div className="side-menu">
          <SideMenuBlock title="Search" block={<SearchBox parentCallback={this.searchCallback}/>}/>
          <SideMenuBlock title="Cities" block={<CheckboxBlock searchQ={this.state.searchQuery} parentCallback={this.cityCallback}/>}/>
        </div>
      </div>
    );
  }
}