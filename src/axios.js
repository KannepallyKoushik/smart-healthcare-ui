import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.111:8000/",
});

export default instance;
