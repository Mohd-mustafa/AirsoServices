import axios from 'axios';

// Base URL for API requests
const apiUrl = 'http://localhost:5000/api/';

// Create a visa
const createVisa = async (visaData) => {
  try {
    const response = await axios.post(`${apiUrl}visa`, visaData);
    return response.data;
  } catch (error) {
    console.error('Error creating visa:', error);
    throw error;
  }
};

const getVisaById = async (visaId) => {
  try {
    const response = await axios.get(`${apiUrl}visa/${visaId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching visa by ID:', error);
    throw error;
  }
};


// Delete a visa
const deleteVisa = async (visaId) => {
  try {
    const response = await axios.delete(`${apiUrl}visa/${visaId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting visa:', error);
    throw error;
  }
};

// Get a visa with its types
const getVisaWithTypes = async (visaId) => {
  try {
    const response = await axios.get(`${apiUrl}visa/${visaId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching visa with types:', error);
    throw error;
  }
};

// Update a visa
const updateVisa = async (visaId, visaData) => {
  try {
    const response = await axios.put(`${apiUrl}visa/${visaId}`, visaData);
    return response.data;
  } catch (error) {
    console.error('Error updating visa:', error);
    throw error;
  }
};

// Group all functions into an object and export it as default
const visaService = {
  createVisa,
  deleteVisa,
  getVisaWithTypes,
  updateVisa,
  getVisaById
};

export default visaService;
