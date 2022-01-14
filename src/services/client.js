
import { AxiosInstance } from "../config/axios-config";

export const GET = (url, data) => {
    return AxiosInstance().get(url, { data })
        .then(response => response.data)
}

export const POST = (url, payload) => {
    return AxiosInstance().post(url, payload)
        .then(response => response.data)
}

export const PUT = (url, payload) => {
    return AxiosInstance().post(url, payload)
        .then(response => response.data)
}

export const DELETE = (url, data) => {
    return AxiosInstance().get(url, { data })
        .then(response => response.data)
} 