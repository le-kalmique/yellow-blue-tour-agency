import React from "react";

import "../../stylesheets/Gallery.css"
import {
  Link
} from "react-router-dom";

function GalleryImage(props) {
  return (
    <div className="gallery__item">
      <img className="gallery__image" src={props.src} alt="gallery image"/>
      <div className="gallery__text">{props.name}</div>
    </div>);
}

export default class GallerySection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tours: []
    }
  }
  componentDidMount() {
    this.setState({loading: true});
    fetch("http://localhost:4000/api/tours/gallery")
      .then(res => res.json())
      .then(tours => {
        if (tours.status == 500) throw new Error("505");
        else {
          this.setState({
            loading: false,
            tours: tours.tours
          })
        }
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="section__content gallery">
        {
          this.state.loading ? 'Loading...' :
            this.state.tours.map((tour, i) =>
              <Link to={`/tours/${tour._id}`} key={i}>
                <GalleryImage src={tour.imgUrl} name={tour.name}/>
              </Link>
            )
        }
      </div>
    )
  }
}