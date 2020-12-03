import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const cmsAxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

cmsAxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("rsToken");

    const xAcmeApiKey = { Authorization: `Bearer ${token}` };
    config.headers = { ...config.headers, ...xAcmeApiKey };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { cmsAxiosInstance };
