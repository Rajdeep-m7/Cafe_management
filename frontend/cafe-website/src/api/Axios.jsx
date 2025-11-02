import axios from "axios";

const API = axios.create({
  baseURL: "https://cafe-management-a7uc.onrender.com/api",
  withCredentials: true, 
});

export default API;
