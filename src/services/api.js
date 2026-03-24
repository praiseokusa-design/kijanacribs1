import axios from "axios";

const API = axios.create({
  baseURL: "https://kus-kus.alwaysdata.net/api"
});

export default API;