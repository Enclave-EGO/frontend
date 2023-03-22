import axios from "axios";

const httpRequest = axios.create({
  // baseURL: "http://localhost:4001"
  baseURL: "http://54.199.5.109:4001",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: ""
  }
});

export default httpRequest;
