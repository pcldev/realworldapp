import axiosClient from "../axiosClient";

const BASE_PATH_URL = "/articles";

const FavoritesAPI = {
  postFavoriteAnArticle: (slug: String) => {
    const url = `${BASE_PATH_URL}/${slug}/favorite`;
    return axiosClient.post(url);
  },

  deleteUnfavoriteAnArticle: (slug: String) => {
    const url = `${BASE_PATH_URL}/${slug}/favorite`;
    return axiosClient.delete(url);
  },
};

export default FavoritesAPI;
