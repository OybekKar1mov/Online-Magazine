import Axios from "axios";
import config from "../configs";
import Toastify from "toastify-js";

const { baseURL, baseImgUrl } = config;

const axios = Axios.create({
  baseURL,
});
const ApiForImg = Axios.create({
  baseURL: baseImgUrl,
});

function getToken(config) {
  config.headers.authorization = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "";
  return config;
}

axios.interceptors.request.use(
  (config) => {
    return getToken(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     if (error.response.status === 404 || 401 || 400) {
//       Toastify({
//         text: error.response.data.msg,
//         duration: 3000,
//       }).showToast();
//     } else {
//       Toastify({
//         text: error.response.data.msg,
//         duration: 3000,
//       }).showToast();
//     }

//     return Promise.reject(error);
//   }
// );

export { axios as default };
