import { IProfile } from "./UserProfile";

export interface IArticle {
  slug: String;
  title: String;
  description: String;
  body: String;
  tagList: String[];
  createdAt: String;
  updatedAt: String;
  favorited: Boolean;
  favoritesCount: Number;
  author: IProfile;
}

export interface ISingleArticleResponse {
  article: IArticle;
}

export interface IMultipleArticlesReponse {
  articles: IArticle[];
  articlesCount: Number;
}

export interface INewArticle {
  title: String;
  description: String;
  body: String;
  tagList: String[];
}

export interface INewArticleRequest {
  article: INewArticle;
}

export interface IUpdateArticle {
  title: String;
  description: String;
  body: String;
}

export interface IUpdateArticleRequest {
  article: IUpdateArticle;
}
