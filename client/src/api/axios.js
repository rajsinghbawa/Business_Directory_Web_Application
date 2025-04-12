import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Adjust if different
// const BASE_URL = "http://localhost:5000/api"; // Adjust if different

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Optional: if using cookies
});

export default axiosInstance;
