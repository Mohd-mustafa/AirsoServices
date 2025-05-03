import React from 'react';
import './tripDetails.css';
import { useNavigate } from 'react-router-dom';

const tripsDetails = [4, 6, 8, 10, 12, 'Customize as per your requirements'];

const TripDetails = () => {
     
      const navigate=useNavigate();

      const handleCard= (trip)=>{
        if(typeof trip ==='number'){
            navigate(`/tripDetilsForDays/${trip}`)
        }
      }

    return (
        <div className="trip-details-container">
            <div className='trip-details-heading-section'>
            <h1>Get Umrah packages for your own city</h1>
                <p>Select your days below and we’ll show you Umrah
                     packages that exactly meet your requirements</p>
            </div>
             <div className='trip-detaisl-card'>
            {tripsDetails.map((trip, index) => (
                <div key={index} className="trip-card" onClick={()=> handleCard(trip)}>
                    <div className="trip-card-inner">
                        {/* Front Side */}
                        <div className="trip-card-front">
                            {typeof trip === 'string' ? (
                                <p className="custom-trip">{trip}</p>
                            ) : (
                                <p className="trip-day">{trip} Days</p>
                            )}
                        </div>

                        {/* Back Side */}
                        <div className="trip-card-back">
                            <p>Start Your Journey</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            
        </div>
    );
};

export default TripDetails;
