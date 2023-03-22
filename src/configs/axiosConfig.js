import axios from "axios";

// const BASE_URL = "http://localhost:4001";
const BASE_URL = "http://54.199.5.109:4001";

const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: ""
  }
});

export default httpRequest;
