import axios from "../utils/axiosInstance"; // Ensure you have an axios instance setup

const BASE_URL = "http://localhost:5000/api/groups";

const GroupService = {
    // 🔹 Fetch all groups
    getAllGroups: async () => {
      try {
        const response = await axios.get(BASE_URL);
        return response.data;
      } catch (error) {
        console.error("Error fetching groups:", error);
        throw error;
      }
    },
  
    // 🔹 Add a new group
    addGroup: async (groupData) => {
      try {
        const formData = new FormData();
        for (const key in groupData) {
          formData.append(key, groupData[key]);
        }
        
        const response = await axios.post(BASE_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        return response.data;
      } catch (error) {
        console.error("Error adding group:", error);
        throw error;
      }
    },
  
    // 🔹 Update an existing group
    updateGroup: async (id, updatedData) => {
      try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
        return response.data;
      } catch (error) {
        console.error("Error updating group:", error);
        throw error;
      }
    },
  
    // 🔹 Delete a group by ID
    deleteGroup: async (id) => {
      try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error deleting group:", error);
        throw error;
      }
    },
  };
    

    export default GroupService;
