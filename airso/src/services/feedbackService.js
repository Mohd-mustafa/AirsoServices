import axios from "../utils/axiosInstance"; // Ensure you have an axios instance setup
const BASE_URL = "http://localhost:5000/api/contacts";

const FeedbackService ={
  
    getAllFeedbacks : async () =>{
        try{
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
          console.error("Error fetching groups:", error);
          throw error;
        
        }
    },
 

      deleteFeedback: async (id) => {
      try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error deleting group:", error);
        throw error;
      }
    },

}


export default FeedbackService;
