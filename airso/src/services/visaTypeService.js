import axios from 'axios';

// Define the base URL for the API (update with your actual server URL)
const API_URL = 'http://localhost:5000/api/types-of-visa';

const visaTypeService = {
    // Create a new type of visa
    createVisaType: async (formData) => {
      try {
        const response = await axios.post(API_URL, formData);
        return response;   // return full response, not just data
      } catch (error) {
        console.error('Error creating visa type:', error);
        throw error;
      }
    },
    
    getAllVisaTypes: async () => {
        try {
          const response = await axios.get(API_URL);
          return response.data;
        } catch (error) {
          console.error('Error fetching all visa types:', error);
          throw error;
        }
      },

      getVisaById: async (id) => {
        try {
          const response = await axios.get(`${API_URL}/${id}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching visa by ID ${id}:`, error);
          throw error;
        }
      },
      updateVisaType: async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(`Error updating visa type with ID ${id}:`, error);
      throw error;
    }
  },

  updateVisaType: async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(`Error updating visa type with ID ${id}:`, error);
      throw error;
    }
  },


  deleteVisaType: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting visa type with ID ${id}:`, error);
      throw error;
    }
  }
};

export default visaTypeService;
