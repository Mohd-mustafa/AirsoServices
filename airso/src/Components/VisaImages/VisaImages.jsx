import React from 'react'
import kaaba from '../../assests/kaaba.jpg'


const VisaImages = () => {
  return (
    <div> 
          <div className="gallery-container">
          <div className="main-image">
            <img src={kaaba} alt="Main" />
            <div className="overlay-text">USA Visa for Indians</div>
          </div>
          <div className="grid-container">
            <img src={kaaba} alt="City" />
            <img src={kaaba} alt="Iceberg" className='second' />
            <img src={kaaba} alt="Castle" />
            <img src={kaaba} alt="White House" className='fourth' />
          </div>
          <div className="reviews">
            <span className="rating">4.73⭐</span> | <a href="#">7.5k Reviews</a>
          </div>
        </div>
     </div>
  )
}

export default VisaImages