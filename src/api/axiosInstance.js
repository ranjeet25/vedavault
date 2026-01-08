import axios from "axios";

const axiosInstance = axios.create({
  baseURL:  "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * (JWT ready – currently disabled)
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // 🔒 Enable later when auth is added
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * Centralized error handling
 */
axiosInstance.interceptors.response.use(
  (response) => response.data, // always return data directly
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    console.error("API Error:", message);

    return Promise.reject({
      status: error?.response?.status,
      message,
    });
  }
);

export default axiosInstance;
