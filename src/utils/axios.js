import Axios from "axios";
import config from "../configs";
import Toastify from 'toastify-js'
const { baseURL, baseImgUrl } = config;
const axios = Axios.create({
    baseURL,
});
const ApiForImg = Axios.create({
    baseURL: baseImgUrl,
});

function getToken(config) {
    config.headers.Authorization = localStorage.getItem("token")
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

ApiForImg.interceptors.request.use(
    (config) => getToken(config),
    (error) => {
        return Promise.reject(error);
    }
);

export { ApiForImg, axios as default };


axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || 404 || 400 || 402 || 502 || 500) {
            Toastify({
                text: error.response.data.msg,
                duration: 4000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                onClick: function () { }
            }).showToast();
        } else {
            Toastify({
                text: "Your error is not response",
                duration: 4000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                onClick: function () { }
            }).showToast();
        }
    }); 
