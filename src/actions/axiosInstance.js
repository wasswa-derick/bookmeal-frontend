import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
  headers: { token: `${localStorage.getItem("authUserToken")}` }
});

axiosInstance.interceptors.request.use(config => {
  if (
    localStorage.getItem("authUserToken") &&
    config.headers.token === "null"
  ) {
    config.headers.token = `${localStorage.getItem("authUserToken")}`;
  }
  return config;
});

export default axiosInstance;
