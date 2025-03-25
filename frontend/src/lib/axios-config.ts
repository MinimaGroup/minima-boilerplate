import axios from "axios";
import { isTokenExpired, isTokenExpiringSoon } from "./token-utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Check if token is expired or about to expire
      if (isTokenExpired(accessToken) || isTokenExpiringSoon(accessToken)) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            // Try to refresh the token
            const response = await axios.post(
              `${API_URL}/api/auth/token/refresh/`,
              {
                refresh: refreshToken,
              }
            );
            const { access } = response.data;
            localStorage.setItem("accessToken", access);
            config.headers.Authorization = `Bearer ${access}`;
          } catch (error) {
            // If refresh fails, clear tokens and redirect to login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/auth/login";
            return Promise.reject(error);
          }
        } else {
          // No refresh token available, clear tokens and redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth/login";
          return Promise.reject(new Error("No refresh token available"));
        }
      } else {
        // Token is still valid
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth/login";
    }
    // Extract error message from response
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      error.message ||
      "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
