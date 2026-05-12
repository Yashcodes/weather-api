import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.WEATHER_BASE_URL
});