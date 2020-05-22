// client/src/App.js
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                tours: []
            }
        }
    }
    componentDidMount() {
        this.getDataFromDb();
    }
    getDataFromDb = () => {
        fetch('http://localhost:4000/api/tours')
            .then((data) => data.json())
            .then((res) => this.setState({data: res}))
            .catch(err => console.log(err))
    }
    getTours = () => {
        return this.state.data.tours.map(tour =>
            <p key={tour._id}>{tour.name} {tour.place}</p>
        )
    }
    render() {
        return (
            <div>
                <h1>Hello</h1>
                {this.getTours()}
            </div>
        );
    }
}

export default App;