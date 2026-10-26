import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000/api", //static part of the server url
    withCredentials: true,
    headers: {
        "Content-Type": "application/json", //to tell client that the data type is only json
    },
});
export default api;