import axios from "axios";

const api = axios.create({
  baseURL: "https://campuscare-backend-rt14.onrender.com/api",
});

export default api;