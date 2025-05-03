import React, { useState } from 'react';
import axios from "axios";
import './addingGroups.css';

const hotelPrices = {
  "3-star": 500,
  "4-star": 750,
  "5-star": 1000,
};

const AddingGroups = () => {
  const [formData, setFormData] = useState({
    group_name: '',
    days: '',
    flight: '',
    starting_price: hotelPrices["3-star"],
    hotel_category: '3-star',
    image: null,  // Store file instead of URL
    makkah_nights: '',
    madina_nights: ''
  });

  const [message, setMessage] = useState('');

  // Handle text input & select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "hotel_category") {
      setFormData({ ...formData, [name]: value, starting_price: hotelPrices[value] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });  // Store file object
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/groups", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Group added successfully:", response.data);
      setMessage("Group added successfully!");
    } catch (error) {
      console.error("Error adding group:", error);
      setMessage("Error adding group. Please try again.");
    }
  };
  
  return (
    <div className='adding-group-container'>
      <div className="adding-groups">
        <h2>Add Group</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="input-container">
            <label htmlFor="group_name">Package Name:</label>
            <input
              type="text"
              id="group_name"
              name="group_name"
              value={formData.group_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-row">
            <div className="input-container">
              <label htmlFor="days">Days:</label>
              <input
                type="number"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="flight">Flight:</label>
              <input
                type="text"
                id="flight"
                name="flight"
                value={formData.flight}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="hotel_category">Hotel Category:</label>
            <select
              id="hotel_category"
              name="hotel_category"
              value={formData.hotel_category}
              onChange={handleChange}
              required
            >
              <option value="3-star">3-Star</option>
              <option value="4-star">4-Star</option>
              <option value="5-star">5-Star</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="starting_price">Starting Price:</label>
            <input
              type="number"
              id="starting_price"
              name="starting_price"
              value={formData.starting_price}
              readOnly
            />
          </div>

          <div className="input-container">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="input-row">
            <div className="input-container">
              <label htmlFor="makkah_nights">Makkah Nights:</label>
              <input
                type="number"
                id="makkah_nights"
                name="makkah_nights"
                value={formData.makkah_nights}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="madina_nights">Madina Nights:</label>
              <input
                type="number"
                id="madina_nights"
                name="madina_nights"
                value={formData.madina_nights}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit">Add Group</button>
        </form>
      </div>
    </div>
  );
};

export default AddingGroups;
