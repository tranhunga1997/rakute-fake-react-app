import axios from "axios";
import axiosRateLimit from "axios-rate-limit";
import { stringify } from "query-string";

const { REACT_APP_API_BASE_URL, REACT_APP_APP_ID } = process.env;

const clientAxios = axiosRateLimit(axios.create({
    baseURL: `${REACT_APP_API_BASE_URL}/services/api`,
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: params => stringify(params),
    params: {
        "applicationId": REACT_APP_APP_ID,
        "formatVersion": 2,
    }
}), {
    maxRequests: 1,
    perMilliseconds: 500,
})

clientAxios.interceptors.request.use(request => {
    return request;
}, error => {
    throw error;
})

clientAxios.interceptors.response.use(response => {
    if (response && response.data)
        return response.data;
    return response;
}, error => {
    throw error;
})

export default clientAxios;