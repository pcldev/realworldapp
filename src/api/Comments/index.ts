import axiosClient from "../axiosClient";

const BASE_PATH_URL = "/articles";

interface IComment {
  body?: String;
}

const CommentAPI = {
  getCommentForAnArticle: (slug: String) => {
    const url = `${BASE_PATH_URL}/${slug}/comments`;
    return axiosClient.get(url);
  },

  postCreateACommentForAnArticle: (slug: String, comment: IComment) => {
    const url = `${BASE_PATH_URL}/${slug}/comments`;
    return axiosClient.post(url, {
      comment,
    });
  },

  deleteACommentForAnArticle: (slug: String, id: Number) => {
    const url = `${BASE_PATH_URL}/${slug}/comments/${id}`;
    return axiosClient.delete(url);
  },
};

export default CommentAPI;
