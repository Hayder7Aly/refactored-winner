import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // Update with your actual API base URL
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally here
    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default axiosInstance;
