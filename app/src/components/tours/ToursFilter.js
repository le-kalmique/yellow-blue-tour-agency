import React, {Component} from "react";
import "../../stylesheets/Filter.css";

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
    let cities = this.state.chosenCities;
    if (event.target.checked) {
     cities.push(event.target.value);
    }
    else for(let i = 0; i < cities.length; i++) {
        if (cities[i] === event.target.value) cities.splice(i, 1);
    }
    this.setState({chosenCities: cities}, this.sendToFilter);
  }
  setCities(name) {
    fetch(`http://localhost:4000/api/tours/cities?name=${name}`)
      .then(res => res.json())
      .then(cities => {
        let chosen = this.state.chosenCities;
        for (let i = 0; i < chosen.length; i++)
        {
          if (!cities.includes(chosen[i])) {
            chosen.splice(i, 1);
            i--;
          }
        }
        this.setState({citiesAll: cities, loading: false, chosenCities: chosen})
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
          <label className="checkbox-block__item"  key={i}>{city}
            <input name={`city${i}`} className="checkbox-block__input" type="checkbox" onChange={this.onChange} value={city}/>
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

export default class FilterMenu extends Component {
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
        <SideMenuBlock title="Search" block={<SearchBox parentCallback={this.searchCallback}/>}/>
        <SideMenuBlock title="Cities" block={<CheckboxBlock searchQ={this.state.searchQuery} parentCallback={this.cityCallback}/>}/>
      </div>
    );
  }
}