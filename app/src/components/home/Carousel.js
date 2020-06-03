import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import '../../stylesheets/Carousel.css'

function LeftArrow(props) {
  return(
    <div className='backArrow' onClick={props.goToPrevSlide}>
      <FontAwesomeIcon icon={faAngleLeft} className='left-icon' size="3x"/>
    </div>
  )
}

function RightArrow(props){
  return(
    <div className='nextArrow' onClick={props.goToNextSlide}>
      <FontAwesomeIcon icon={faAngleRight} className='right-icon' size="3x"/>
    </div>
  )
}

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {array: props.array};
  }
  render() {
    return(
      <section>
        {
          this.state.array.map((s, index) =>
            <div className={
              index === this.props.activeIndex ? 'active' : 'inactive'}
                 key={index}>
              <p className='slide__title'>{s.name}</p>
              <img className='slide__image' src={s.imgUrl} alt='tour carousel'/>
            </div>
          ) }
      </section>
    )
  }
}

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      length: 3,
      array: [],
      loading: false
    };

    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);

  }
  componentDidMount() {
    this.setState({loading: true});
    fetch('http://localhost:4000/api/tours/carousel')
      .then(response => {
        if (response.status === 500) throw new Error("Error 500");
        return response.json();
      })
      .then(data => {
        this.setState({
          loading: false,
          array: data.tours
        })
      })
      .catch(err => console.log(err))
  }

  goToNextSlide() {
    let imageIndex = this.state.activeIndex;

    if(imageIndex === this.state.length - 1) {
      imageIndex = 0;
    }
    else {
      imageIndex++;
    }
    this.setState({ activeIndex: imageIndex });
  }

  goToPrevSlide() {
    let imageIndex = this.state.activeIndex;

    if(imageIndex < 1) {
      imageIndex = this.state.length - 1;
    }
    else {
      imageIndex--;
    }
    this.setState({ activeIndex: imageIndex });
  }

  render() {
    return (
      <div className='carousel'>
        <div className='carousel__content'>
          <LeftArrow
            goToPrevSlide={this.goToPrevSlide}
          />
          <div className='slider-text'>
            {this.state.loading ?
              <p className="loader">Loading...</p>
                :
              <Slide
                array={this.state.array}
                activeIndex={this.state.activeIndex}
              />
            }
          </div>
          <RightArrow
            goToNextSlide={this.goToNextSlide}
          />
        </div>
      </div>
    );
  }
}