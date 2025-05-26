import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;  // Load backend URL from .env

// Signup API
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login API
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API}/api/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
