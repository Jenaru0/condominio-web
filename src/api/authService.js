import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

export const login = async (email, password) => {
  console.log("Logging in with", email, password);
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log("Response:", response.data);
  return response.data;
};
