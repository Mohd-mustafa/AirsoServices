    import axios from "axios";
     // Create an Axios instance
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000", // Your backend URL
         headers: {
            "Content-Type": "application/json",
        },
        withCredentials:true,

    });

     axiosInstance.interceptors.request.use(
        (config) => {
             return config; // Do NOT manually add token header            
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    export default axiosInstance;
