import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getHotels } from "../../services/HotelService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ListOfHotels.css";

 const ListOfHotels = () => {
 
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  
  
 
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        setHotels(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchHotels();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

   return (
     <div className="hotel-list-container">
      <div className="hotel-heading">
      <h2>Best Umrah Hotels for Comfort & Convenience</h2>
            <p>Experience comfort and serenity at our top-rated Makkah and Madinah hotels, favored by pilgrims for their hospitality and proximity to holy sites.
            </p>

      </div>
                       {error && <p className="error">{error}</p>}
         {hotels.length > 0 ? (
          <Slider {...settings}>
          {hotels.map((hotel) =>(
            <div key={hotel.id} className="hotel-card">
              {hotel.image && <img src={hotel.image} alt={hotel.name} />}
              <div className="hotel-details">
              <h3>{hotel.name}</h3>
              <p><strong>Location:</strong> {hotel.location}</p>
              <p><strong>Price:</strong> ${hotel.price}</p>
              <p className="rating"><strong>Rating:</strong> {hotel.rating} ⭐</p>
              </div>
               </div>
          ))}
          </Slider>
        ):(
          <p>No hotels available</p>

        )}
                  
     </div>
   )
 }
 
 export default ListOfHotels