import axiosClient from "../axiosClient";

const DefaultAPI = {
  getTags: () => {
    const url = "/tags";
    return axiosClient.get(url);
  },
};

export default DefaultAPI;
