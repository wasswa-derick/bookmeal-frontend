import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5000/api/v1",
  baseURL: "https://mealbooking-api.herokuapp.com/api/v1/",
  headers: { Authorization: `${localStorage.getItem("authUserToken")}` }
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("authUserToken")
  if (token) {
    config.headers.Authorization = `${localStorage.getItem("authUserToken")}`;
  }
  return config;
});

export default axiosInstance;
