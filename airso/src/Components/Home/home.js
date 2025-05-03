import React from 'react'
import './home.css'
import ImageSlider from '../ImageSlider/ImageSlider.js'
import DetailsOfPage from '../DetailsOfPackge/detailsOfPacakge.js'
import TripDetails from '../Trips/tripsDetails.js'
import Enquiry from '../Enquiry/Enquiry.jsx'
import UserFeedback from '../UsersFeedback/userFeedback.js'
import ListOfHotels from '../GetListOfHotels/ListOfHotels.jsx'

const home = () => {
  return (
    <div className='home'> 
    <ImageSlider/>
    <Enquiry/>
    <DetailsOfPage/>
    <TripDetails/>
    <ListOfHotels/>
    <UserFeedback/>

    </div>
  )
}

export default home