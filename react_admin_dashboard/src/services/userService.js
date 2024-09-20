// src/services/userService.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const API_URL = `${BASE_URL}/userDetails`;

export const fetchUserDetails = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchUserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

export const updateUser = async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
