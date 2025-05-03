import React, { useEffect, useState } from 'react'
import './userFeedback.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import kaba  from '../../assests/kaaba.jpg'
import FeedbackService from '../../services/feedbackService';
   
const UserFeedback = () => {
    const [feedbacks,setFeedbacks]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const rating = 4.5; // Fixed rating value

   
  useEffect(() =>{
    const fetchFeedback = async () =>{
      try{
        const data=await FeedbackService.getAllFeedbacks();
        setFeedbacks(data)
      }catch(error){
        setError("Failed to fetch feedbacks");
        console.error("Error fetching feedbacks:", error);
      }finally{
        setLoading(false);

      }
    };
    fetchFeedback()

  }, []);

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
 

  return (
    <div className='swiper-main-container'>
     <div className="swiper-container">
      <div className='delighted-heading'>
        <h1>We are delighted to hear from our happy customers!
        </h1>
       </div>

       <div className='rating-review'>
       <h3>Reviews - Excellent {rating}</h3> {/* Display rating text before stars */}

       <div className="star-rating">
        
        {[...Array(5)].map((_, index) => {
          const isFullStar = index + 1 <= Math.floor(rating); // Full stars (before the half star)
          const isHalfStar = rating > index && rating < index + 1; // Half star if rating is a decimal
  
          return (
            
            <span
              key={index}
              className={`star ${isFullStar ? 'full' : ''} ${isHalfStar ? 'half' : ''}`}
            >
              {isHalfStar ? '★' : isFullStar ? '★' : '☆'} {/* Unicode for half and full stars */}
            </span>
          );
        })}
      </div>
  
</div>
     
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={3} // Show 3 cards at a time
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      
    >
      {feedbacks.length > 0 ? (
        feedbacks.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="feedback-card">
              <div className='feedback-card-image'>
              <img src={kaba} alt=''/>
              </div>
              <div className='sub-card'>
              <h3 className="feedback-card-title">{card.name}</h3>
              <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const isFullStar = index + 1 <= Math.floor(card.rating); // Full stars (before the half star)
              const isHalfStar = card.rating > index && card.rating < index + 1; // Half star if rating is a decimal

              return (
                <span
                  key={index}
                  className={`star ${isFullStar ? 'full' : ''} ${isHalfStar ? 'half' : ''}`}
                >
              {'★'} 
                </span>
              );
            })}
          </div>
               <p>"{card.message} "</p>
               {/* Assuming card.rating contains the rating */}
          
               </div>
             </div>
          </SwiperSlide>
        ))
      ):(
        <p>No feedbacks available</p>

      )
      }
            
    </Swiper>
    </div>
    </div>
     )
}

export default UserFeedback