import axios from "axios";
import queryString from "query-string";
import { getUser } from "../commons/storage";

const isAuthencated = getUser();

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `${isAuthencated ? `Token ${isAuthencated?.token}` : ""}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  (error) => {
    // Handle errors
    // eslint-disable-next-line no-throw-literal
    throw `${Object.keys(error.response.data.errors)[0]} ${
      Object.values(error.response.data.errors)[0]
    }`;
  }
);
export default axiosClient;
