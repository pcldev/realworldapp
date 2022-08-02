import axiosClient from "../axiosClient";

const BASE_PATH_URL = "/profiles";

const ProfileAPI = {
  getAProfile: (username: String) => {
    const url = `${BASE_PATH_URL}/${username}`;
    return axiosClient.get(url);
  },

  postFollowAUser: (username: String) => {
    const url = `${BASE_PATH_URL}/${username}/follow`;
    return axiosClient.post(url);
  },

  deleteUnFollowUser: (username: String) => {
    const url = `${BASE_PATH_URL}/${username}/follow`;
    return axiosClient.delete(url);
  },
};

export default ProfileAPI;
