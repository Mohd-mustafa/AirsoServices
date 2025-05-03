 import passport from './Passport.css'
import passportImage from '../../assests/passportimage.png'
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BiRepost } from 'react-icons/bi';


const Passport = () => {
    const [rating, setRating] = useState(0);   // current selected rating
    const [hover, setHover] = useState(null);
    const services = [
        {
          title: 'Fresh passport',
          description: "With the guidance of our experts, you'll receive your first passport quickly.",
        },
        {
          title: 'Passport renewal',
          description: "If your passport has expired, you'll apply for a renewal with us.",
        },
        {
          title: 'Lost passport',
          description: "Even when you've lost your passport, our passport agents in Hyderabad will assist you to obtain it again.",
        },
        {
          title: 'ECNR passport',
          description: "We will support you in obtaining an Emigration Check Not Required passport if you would like to travel to a different nation for employment purposes.",
        },
        {
          title: 'Tatkal passport',
          description: "You'll apply for a passport on an urgent basis through our passport agents in Hyderabad.",
        },
        {
          title: 'Damaged passport',
          description: "If your previous passport has been damaged, we'll help you with the issuance of a new one.",
        },
      ];
  return (
    <div className='passport-container'>
        <div className='passport-apply'>
       <div className='passport_image'>
        <img src={passportImage} alt='passport' />
      </div>
         <div>
         <p >If you have long been searching for the best passport agents in Hyderabad, then look no further! SmotPro India Pvt Ltd, our travel company, is more than willing to offer our services to you.

85 Passport applications processed successfully last week.
Along with the regular passport, we also help in issuing the tatkal passport, ECNR passport, minor passport, passport renewal, etc.

Our passport agents in Hyderabad are available for you round the clock. Our customers have always been our priority, and hence, we assure you that we do not leave them disappointed. 
Connect with us to avail of our dedicated services.</p>
       </div>
       <div className='passport-related-services'>
       <div className="passport-section">
      <h2 className="passport-heading">Our Passport Related Services</h2>
      <ul className="service-list">
        {services.map((service, index) => (
          <li key={index} className="service-item">
            <BiRepost className="service-icon" />
            <div className="service-content">
              <span className="service-title">{service.title}:</span>
              <span className="service-description"> {service.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
       </div>
      </div>
      <div className='customer-review'>
        <div className='review-card'>
            <h2>Customers Reviews:</h2>
        <div className='star-rating'>
            {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
          <FaStar key={index} className="star" size={30} />
          </label>
        );
      })}
      </div>
      <div className='rating'>
      <p>Rated: 4.8 / 5 Based on 10123 reviews </p>
      </div>
      <hr class="horizontal-line"/>
      <div className='rating-para'>
      <p className="center-text">
  AirsoService team had been highly efficient in providing 
  passport-related services. Name change process in passport is 
  a cumbersome and time-consuming process. But AirsoService gave me proper guidance and helped me in documentation and got my passport renewed in time. My special thanks to the whole team.
</p>
      </div>
         </div>
      </div>
     </div>
  )
}

export default Passport
