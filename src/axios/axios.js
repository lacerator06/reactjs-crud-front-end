import axios from "axios";

const baseURL = "http://localhost:8086/";

const axiosClient = axios.create({
    baseURL : baseURL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
})

export default axiosClient;