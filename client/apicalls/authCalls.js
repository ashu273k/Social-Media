
import axios from "axios";
import { API_BASE_URL } from "./config";


const api = axios.create({
    baseURL : API_BASE_URL,
    withCredentials: true,

})

// route - /api/auth/signup

export const signUpUser = async ({ name, userName, email, password }) => {
  try {
    const response = await api.post("/api/auth/signup", {
      name,
      userName,
      email,
      password,
    });
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};
    
export const signInUser = async ({ userName, password }) => {
  try {
    const response = await api.post("/api/auth/signin", {
      userName,
      password,
    });
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/user/current", {getCredientials: true});
    
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};

// Get user profile data 
export const getProfile = async (userName) => {
  try {
    const response = await api.get(`/api/user/getprofile/${userName}`);
    
    return response.data; // return just the data
  } catch (error) {
    // standardize error handling
    throw error.response?.data?.message || "Something went wrong";
  }
};
 
