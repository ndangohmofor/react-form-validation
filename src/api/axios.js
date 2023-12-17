import axios from "axios";

const BASE_URL = "http://192.168.1.132:8080";
axios.defaults.withCredentials = true;
axios.defaults.withXSRF = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const HEADERS = {
  "Content-Type": "application/json",
  Accept:
    "application/json, application/json-patch+json, plain/text, application/x-www-form-urlencoded",
  "Cache-Control": "no-cache",
};

export default axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});
