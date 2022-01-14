import axios from "axios";
import { BASE_URL } from "./constants";

const defaultOptions = () => ({});
export const AxiosInstance = () => {
    return axios.create({
        baseURL: `${BASE_URL}`,
        ...defaultOptions()
    });
};