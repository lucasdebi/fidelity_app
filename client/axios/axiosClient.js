import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://10.67.6.163:3001",
});

export default axiosClient;