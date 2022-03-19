import axios from "axios";
// https://shrtapi.herokuapp.com/api/
// http://localhost:5000/api/

const BASE_URL = "https://shrtapi.herokuapp.com/api/";

var TOKEN = "";
if (localStorage.getItem("persist:root")) {
  if (
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser !== null
  ) {
    TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser.accessToken;
  }
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
