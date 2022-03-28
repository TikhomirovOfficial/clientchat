import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Access-Control-Allow-Origin": true
    }
});
