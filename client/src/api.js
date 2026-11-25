import axios from "axios";
const api = axios.create({
    baseURL: "https://backend4-gr1g.onrender.com/api", //static part of the server url
    withCredentials: true,
    headers: {
        "Content-Type": "application/json", //to tell client that the data type is only json
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)
export default api;