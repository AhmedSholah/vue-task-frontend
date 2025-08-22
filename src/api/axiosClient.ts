import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://158.180.60.149:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
