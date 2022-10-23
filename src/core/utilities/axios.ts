import axios, { type AxiosResponse as AxR } from "axios";

export const apiAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default apiAxios
export type AxiosResponse = AxR