import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {
    console.log("➡️ Request:", config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("⬅️ Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error);
    return Promise.reject(error);
  }
);

export default api;
