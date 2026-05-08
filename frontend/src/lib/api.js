import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

api.interceptors.request.use((config) => {
  const authData = localStorage.getItem("edumentor-auth");

  if (authData) {
    const parsedData = JSON.parse(authData);

    config.headers.Authorization = `Bearer ${parsedData.token}`;
  }

  return config;
});

export default api;