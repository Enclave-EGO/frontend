import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:4001"
});

export default httpRequest;
