import React, { useEffect,useState } from "react";
import './AddHotel.css'
import { addHotel } from "../../services/HotelService.js";

 
const AddHotel = () => {
    
    const [hotelData, setHotelData] = useState({
        name: "",
        location: "",
        price: "",
        rating: "",
        image: null,
      });

    const [message, setMessage] = useState("");
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      // Convert number fields to actual numbers
      const newValue = name === "price" || name === "rating" ? Number(value) : value;
  
      setHotelData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    };
    const handleFileChange = (e) => {
      setHotelData((prevData) => ({
        ...prevData,
        image: e.target.files[0],
      }));
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await addHotel(hotelData);
          setMessage("Hotel added successfully!");
          setHotelData({ name: "", location: "", price: "", rating: "", image: null });
        } catch (error) {
          setMessage(error.message || "Failed to add hotel");
        }
      };
        
  return (
    <div className="add-hotel-container">
    <h2>Add New Hotel</h2>
     {message && <p>{message}</p>}
     <form onSubmit={handleSubmit}>
     <input type="text" name="name" placeholder="Hotel Name" value={hotelData.name} onChange={handleChange} required />
     <input type="text" name="location" placeholder="Location" value={hotelData.location} onChange={handleChange} required />
     <input type="number" name="price" placeholder="Price" value={hotelData.price} onChange={handleChange} required />
     <input type="number" name="rating" placeholder="Rating (1-5)" value={hotelData.rating} onChange={handleChange} required />
     <input type="file" name="image" accept="image/*" onChange={handleFileChange}  />
     <button type="submit">Add Hotel</button>
     </form>
    </div>
  )
}

export default AddHotel