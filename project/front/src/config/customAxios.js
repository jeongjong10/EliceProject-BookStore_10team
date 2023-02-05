import axios from "axios";

//const JWT = localStorage.key("JWT") ? localStorage.getItem("JWT") : "";
const JWT = localStorage.getItem("JWT");

const SERVER_ADDRESS = "http://localhost:3001";

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    authorization: `Bearer ${JWT}`,
  },
});
