import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api'
});

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};