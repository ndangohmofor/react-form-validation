import axios from "axios";

const BASE_URL = "http://localhost:8080";
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json, plain/text, application/x-www-form-urlencoded",
  "Cache-Control": "no-cache",
};

export default axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
  withCredentials: true,
});
