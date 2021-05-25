const axios = require("axios");

axios.defaults.baseURL = "https://dev-api.alldaydr.com";
axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = "Bearer " + token;
    req.headers["AUTH_TOKEN"] = token;
  }
  req.headers["Content-type"] = "application/json";
  return req;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response?.status === 400) {
      localStorage.clear();
    } else {
      return Promise.reject(error);
    }
  }
);
