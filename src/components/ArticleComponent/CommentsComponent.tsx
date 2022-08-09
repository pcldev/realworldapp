import React from "react";
import { NavLink } from "react-router-dom";
import { IComment } from "../../models/Comment";

interface ICommentComponentProps {
  comment?: IComment;
  isAuthenticated?: any;
  onDeleteCommentHandler?: (value: Number) => void;
}

const CommentsComponent = (props: ICommentComponentProps) => {
  const { comment, isAuthenticated, onDeleteCommentHandler } = props;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <NavLink to={`/@${comment.author.image}`} className="comment-author">
          <img
            src={`${comment.author.image}`}
            className="comment-author-img"
            alt=""
          />
        </NavLink>
        &nbsp;
        <NavLink to={`/@${comment.author.image}`} className="comment-author">
          {comment.author.username.toString()}
        </NavLink>
        <span className="date-posted">{comment.createdAt}</span>
        {isAuthenticated?.username === comment.author.username && (
          <span
            onClick={onDeleteCommentHandler.bind(null, comment.id)}
            className="mod-options"
          >
            <i className="ion-trash-a"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsComponent;
