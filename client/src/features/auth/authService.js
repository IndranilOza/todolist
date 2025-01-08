import axios from "axios";

const API_URL = "/api/auth/";

const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}login`, credentials);
    return response.data;
  },
  register: async (data) => {
    const response = await axios.post(`${API_URL}register`, data);
    return response.data;
  },
};

export default authService;
