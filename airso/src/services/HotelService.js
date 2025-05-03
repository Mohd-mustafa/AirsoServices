import axios from "../utils/axiosInstance";
const API_URL = "http://localhost:5000/api/hotels"; // Backend URL

// Add a new hotel
export const addHotel = async (hotelData) => {
    try {
        const formData = new FormData();
        formData.append("name", hotelData.name);
        formData.append("location", hotelData.location);
        formData.append("price", hotelData.price);
        formData.append("rating", hotelData.rating);
        formData.append("image", hotelData.image);
        const response = await axios.post(API_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true, // ✅ Ensure cookies are sent
        });      
        return response;
    } catch (error) {
        throw error.response?.data || "Error adding hotel";
    }
};

// Fetch all hotels
export const getHotels = async () => {
    try {
        const response = await axios.get(API_URL, { withCredentials: true });  // ✅ Ensure cookies are sent
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error fetching hotels";
    }
};

// Update a hotel
export const updateHotel = async (hotelId, hotelData) => {
    try {
        const response = await axios.put(`${API_URL}/${hotelId}`, hotelData, { withCredentials: true });  // ✅ Corrected URL
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error updating hotel";
    }
};

// Delete a hotel
export const deleteHotel = async (hotelId) => {
    try {
        const response = await axios.delete(`${API_URL}/${hotelId}`, { withCredentials: true });  // ✅ Corrected URL
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error deleting hotel";
    }
};
