import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const token = JSON.parse(userInfo).token;

      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

export default API;
