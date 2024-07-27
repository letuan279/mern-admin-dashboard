import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5050/api', 
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/users/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const fetchUserCases = async () => {
  try {
    const response = await api.get('/cases'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching table data:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

