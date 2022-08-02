import { IProfile } from "./UserProfile";

export interface IComment {
  id: Number;
  createdAt: String;
  updatedAt: String;
  body: string;
  author: IProfile;
}

export interface ISingleCommentResponse {
  comment: IComment;
}

export interface IMultipleCommentsReponse {
  comments: IComment[];
}

export interface INewComment {
  body: string;
}

export interface INewCommentRequest {
  comment: INewComment;
}

export interface ITagsResponse {
  tags: String[];
}
