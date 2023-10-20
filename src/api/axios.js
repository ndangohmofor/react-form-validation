import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type":
      "application/json, application/x-www-form-urlencoded, multipart/form-data",
    Accept: "application/json, plain/text, application/x-www-form-urlencoded",
    "Cache-Control": "no-cache",
  },
});
