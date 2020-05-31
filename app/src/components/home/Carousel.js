import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import '../../stylesheets/Carousel.css'

const sliderContent = [
  {title: 'Tour 1', img: 'https://cdn.pixabay.com/photo/2017/01/01/20/30/kiev-1945487_1280.jpg'},
  {title: 'Tour 2', img: 'https://cdn.pixabay.com/photo/2014/04/26/12/11/ukraine-332449_1280.jpg'},
  {title: 'Tour 3', img: 'https://cdn.pixabay.com/photo/2017/08/10/17/35/grave-2625396_1280.jpg'}
]


class LeftArrow extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='backArrow' onClick={this.props.goToPrevSlide}>
        <FontAwesomeIcon icon={faAngleLeft} className='left-icon' size="2x"/>
      </div>
    )
  }
}

class RightArrow extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='nextArrow' onClick={this.props.goToNextSlide}>
        <FontAwesomeIcon icon={faAngleRight} className='right-icon' size="2x"/>
      </div>
    )
  }
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
              <img className='slide__image' src={s.imgUrl} alt='tour image'/>
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
      .then(response => response.json())
      .then(data => {
        if (data.status == 500) console.log(data);
        else {
          console.log(data.tours)
          this.setState({
            loading: false,
            array: data.tours
          })
        }
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