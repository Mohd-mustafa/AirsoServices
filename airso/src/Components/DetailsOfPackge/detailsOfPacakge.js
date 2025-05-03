import React from 'react'
import './detailsOfPacakge.css'
import { FaPlane, FaHotel, FaBus, FaIdCard } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom';


const detailsOfPacakge = () => {

      


  const packageData =[
        {
            title: 'UMRAAH PACKAGES',
            image: require('../../assests/umrah.jpg'),
            description: 'Are you planning for Umrah? Contact us now',
            price:'50000',
            linkText: 'Click here',
            whatsInclude :[
                <p key="airfare"><FaPlane />Air Fare</p>,
               <p key="hotel"><FaHotel/> Hotel</p>,
               <p key="visa"><FaIdCard/> Umrah visa</p>,
               <p key="transportation"><FaBus/> Transportation</p>
           ] 

        },
        {
            title: 'HAJJ PACKAGES',
            image:require('../../assests/haj.jpg'),
            description: 'Planning for Hajj? Contact us for exclusive offers!',
            price:'50000',

            linkText: 'Get Details',
            whatsInclude :[
                     <p key="airfare"><FaPlane />Air Fare</p>,
                    <p key="hotel"><FaHotel/> Hotel</p>,
                    <p key="visa"><FaIdCard/> Umrah visa</p>,
                    <p key="transportation"><FaBus/> Transportation</p>
                ] 
          },
           {
            title: 'STUDENT PACKAGES',
            image:require('../../assests/studentUmrah.jpg'),
             description: 'Special discounts for students. Don’t miss out!',
             price:'50000',

             linkText: 'Check Discounts',
             whatsInclude :[
                <p key="airfare"><FaPlane />Air Fare</p>,
               <p key="hotel"><FaHotel/> Hotel</p>,
               <p key="visa"><FaIdCard/> Umrah visa</p>,
               <p key="transportation"><FaBus/> Transportation</p>
           ] 


          }
    ]

  return (
    <div className='details-of-package-container'>
    {packageData.map((pkg, index) => (
      <div key={pkg.id} className='details-card'>
        <div className='image-container'>
          <img src={pkg.image} alt={pkg.title} className='card-image' />
          <div className='image-overlay'>
            5 Days Umrah Package
          </div>
        </div>
        <h2>{pkg.title}</h2>
        <p>{pkg.description}</p>
        <h3 className='bottom-heading'>What's Included:</h3>
        {pkg.whatsInclude && (
          <div className='whats-include'>
            <div className='top-row'>
              {pkg.whatsInclude.slice(0, 2


                
              ).map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
            <div className='bottom-row'>
              {pkg.whatsInclude.slice(2).map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
          </div>
        )}
        <div className='price-section'>
          <p className='price'>
            <span>Starts From</span>
            <br />
            {pkg.price} INR - per person
          </p>
          <button className='details-button'>Details</button>
        </div>
      </div>
    ))}
  </div>
  
  )
}

export default detailsOfPacakge