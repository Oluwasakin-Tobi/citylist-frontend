import axios from "axios";

const headers = {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*"
};

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/citylist/',
    headers
});


axiosInstance.interceptors.request.use((request) => {
    const loggedInUser = localStorage.getItem("userDetails");
    const loginToken = JSON.parse(loggedInUser);
    if (loginToken !== null) {
        request.headers.Authorization = "Bearer " + loginToken.data.data;
        return request;
    }
},
    (error) => Promise.reject(error)
);

export default axiosInstance;