import axios from "../utils/axiosInstance"; // Ensure you have an axios instance setup


const UserService = {
    async getCurrentUser() {
         try{
            const response = await axios.get("/auth/current-user", { withCredentials: true });
            return response.data.user;

        }catch (error) {
            console.error("Error fetching user:", error);
            return null; // Return null if user not found
        }
    }
}

export default UserService;