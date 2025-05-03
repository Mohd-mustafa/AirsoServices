import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import './TripDetailsForDays.css'
import umrah from '../../assests/2.jpg'
import kaba from '../../assests/kaaba.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBottleWater, faCar, faClock, faContactBook, faHotel, faKaaba, faPassport, faPlane, faSpoon } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import twoimage from '../../assests/twoimage.jpg'
import threeImage from '../../assests/threeimage.jpg'
import fourImage from '../../assests/fourimgae.jpeg'
import fiveImage from '../../assests/fiveimage.jpeg'
import { FaCcVisa } from "react-icons/fa";

const TripDetailsForDays = () => {
    const [isExpanded, setIsExpanded] = useState(false); // State to toggle the description
    const [formData, setFormData] = useState({
        adults: 7,
        children: 4,
        infants: 4,
        group: "",
        fullname: "",
        email: "",
        phone: "",
        city: "",
        message: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleIncrement = (field) =>{
        setFormData((prev) => ({
            ...prev,
            [field]:Math.max(0, prev[field] +1),
        }))
      }
      
      const handleDecrement = (field) =>{
        setFormData((prev) => ({
            ...prev,
            [field] :Math.max(0, prev[field] -1),
        }));
      }
  

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Form Submitted Successfully!");
      };
    
         
         const {id} =useParams();  
         const tripId= parseInt(id,10);    
         const tripDaysDetails = [
            {
                days: 4,
                title:"4 days umraah package",
                  image:kaba,
                price: 85000
                    },
            {
                days: 6,
                 image:twoimage,
                price: 85000

                },
            {
                days: 8,
                 image:threeImage,
                price: 85000

                },
            {
                days: 10,
                     image:fourImage,
                    price: 85000
                },
            {
                days: 12,
                     image:fiveImage,
                    price: 85000
                }
        ];
        
        const globalDescriptionTemplate = `
     7 Days Umrah Package from Hyderabad
Hurry up Limited seats

4 Nights 5-Star Hotel in Makkah with Breakfast Park Inn By Radisson Makkah Al Naseem Hotel (Or Similar)

3 Nights 5-Star Hotel in Madinah with Breakfast Golden Tulip Al Mektan (Or Similar)

Please get in touch with us for more details and to book a suitable Umrah package.
Refer to our Umrah Guide to learn about how to perform Umrah and other aspects of Umrah travel.

Visit our Umrah Guide  Section to learn about how to perform Umrah and other aspects of your Umrah Travel

Note: 

•    Package price is per person.
•    The pricing and package inclusions are based on and subject to current availability.
•    Pay 50% advance per person to book Umrah package.
•    Balance amount must be paid 15 days before departure or the booking will be cancelled.
•    Unexpected changes in fare should be paid by passengers.
•    Services not mentioned in Inclusions are Exclusions.
•    Anything extra will be charged separately (taxes, excess baggage, etc.).
•    Cancellation/refund policy may vary depending on relevant terms and conditions.
•    All terms and conditions apply.  `;
 
     const getFirst50Words = (text) =>{
        const words= text.split(" ");
        return words.splice(0, 50).join(" ") + (words.length > 50 ? "..." : "");

     };

     const shortDescription = getFirst50Words(globalDescriptionTemplate);

     const fullDescription = globalDescriptionTemplate;


     const tripDetails= tripDaysDetails.find(
        (trip) => trip.days === tripId
     );

  return (
    <div className="trip-details-of-day-container">
  {tripDetails ? (
    <div className="trip-details-card">
      <div className="image-container">
        {tripDetails.image && (
          <img
            src={tripDetails.image}
            className="trip-details-image"
            alt={`${tripDetails.days || 'Unknown'} Days Trip`}
          />
        )}
        <div className="image-title">
          {tripDetails.days ? `${tripDetails.days} Days Umrah Package From Hyderabad` : 'Trip Duration Unknown'}
        </div>
      </div>

     <div className='trip-content'>
     <div className='left-side'>
        <h1>Umrah Group Package at Cheapest Prices HYD
        </h1>
        <div className='price'>
             <p >Starting From</p>
             <p className='price-per-person'>₹{tripDetails.price} / person</p>
        </div>  
        <div className='price-location'>
         <p>  <FontAwesomeIcon icon={faClock} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />
         {tripDetails.days-1} Nights / {tripDetails.days} Days</p>
         <div>
        <p><FontAwesomeIcon icon={faLocationDot} size="lg" style={{ color: 'red' }} />
        <span style={{ marginLeft: '8px' }}>HYD---SAUDI</span></p>
         </div>
        </div>
        <div>
        <p className='umrah-packge-details'>
         {isExpanded ? fullDescription : shortDescription}
        </p>
        <a
        onClick={() => setIsExpanded(!isExpanded)}
        className="read-more-btn"
        >
            {isExpanded ? "Read Less" : "Read More"}

        </a>
        </div>

        <div className="what-you-get">
            <p>What you get ?</p>
            <div className="details-of-what-you-get">
                
                <span>  <FontAwesomeIcon icon={faPlane} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />
                  &nbsp;  Air Ticket </span>
                <span> <FontAwesomeIcon icon={faPassport} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp;Umrah Visa</span>
                <span> <FontAwesomeIcon icon={faHotel} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp; Hotels</span>
                <span><FontAwesomeIcon icon={faSpoon} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} /> &nbsp;All Meals</span>
                <span> <FontAwesomeIcon icon={faCar} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp;Transfer</span>
                <span ><FontAwesomeIcon icon={faBottleWater} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />Zamzam</span>
                <span> <FontAwesomeIcon icon={faKaaba} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp;Ziyarat</span>

            </div>
        </div>
       
        </div>
        <div className='right-side'>
        <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Book Your Tour</h2>
        <p className="form-heading">
          Reserve your ideal trip early for a hassle-free trip; secure comfort
          and convenience!
        </p>

        <div className="counter-field">
          <label>Adult (12 years+)</label>
          <div className="counter">
            <button
              type="button"
              onClick={() => handleDecrement("adults")}
              className="counter-btn"
            >
              -
            </button>
            <span>{formData.adults}</span>
            <button
              type="button"
              onClick={() => handleIncrement("adults")}
              className="counter-btn"
            >
              +
            </button>
          </div>
        </div>

        <div className="counter-field">
          <label>Children (02-12 years)</label>
          <div className="counter">
            <button
              type="button"
              onClick={() => handleDecrement("children")}
              className="counter-btn"
            >
              -
            </button>
            <span>{formData.children}</span>
            <button
              type="button"
              onClick={() => handleIncrement("children")}
              className="counter-btn"
            >
              +
            </button>
          </div>
        </div>

        <div className="counter-field">
          <label>Infant (0-2 years)</label>
          <div className="counter">
            <button
              type="button"
              onClick={() => handleDecrement("infants")}
              className="counter-btn"
            >
              -
            </button>
            <span>{formData.infants}</span>
            <button
              type="button"
              onClick={() => handleIncrement("infants")}
              className="counter-btn"
            >
              +
            </button>
          </div>
        </div>
        <label htmlFor="group">Select Group *</label>
        <select
          id="group"
          name="group"
          value={formData.group}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Please Select
          </option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
          <option value="solo">Solo</option>
          <option value="business">Business</option>
        </select>

        <label htmlFor="fullname">Full Name *</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />

        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />

        <label htmlFor="city">City *</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
          required
        />

        <label htmlFor="message">Write Your Message *</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your query"
          required
        ></textarea>

        <button type="submit">Submit Now</button>
      </form>
    </div>
 
         </div>
   
        </div>

    </div>
  ) : (
    <div className="trip-details-not-found">
      <h2>Trip Not Found</h2>
      <p>No trip matches the selected number of days. Please choose a valid option.</p>
    </div>
  )}
</div>

  )
}

export default TripDetailsForDays