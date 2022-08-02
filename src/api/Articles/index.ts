import axiosClient from "../axiosClient";

interface IArticlesUserFollowingParam {
  limit?: Number;
  offset?: Number;
}

interface IArticlesGlobally {
  tag?: String;
  author?: String;
  favorited?: String;
  limit?: Number;
  offset?: Number;
}

interface IArticle {
  title?: String;
  description?: String;
  body?: String;
  tagList?: String[];
}

const BASE_PATH_URL = "/articles";

const ArticlesAPI = {
  getRecentArticlesUserFollowing: (params?: IArticlesUserFollowingParam) => {
    const url = `${BASE_PATH_URL}/feed`;
    return axiosClient.get(url, { params });
  },

  getArticlesGlobally: (params?: IArticlesGlobally) => {
    const url = BASE_PATH_URL;
    return axiosClient.get(url, { params });
  },

  postCreateAnArticle: (article: IArticle) => {
    const url = BASE_PATH_URL;
    return axiosClient.post(url, {
      article,
    });
  },

  getAnArticle: (slug: String) => {
    const url = `${BASE_PATH_URL}/${slug}`;
    return axiosClient.get(url);
  },

  putUpdateAnArticle: (slug: String, article: IArticle) => {
    const url = `${BASE_PATH_URL}/${slug}`;
    return axiosClient.put(url, { article });
  },

  deleteDeleteAnArticle: (slug: String) => {
    const url = `${BASE_PATH_URL}/${slug}`;
    return axiosClient.delete(url);
  },
};

export default ArticlesAPI;
