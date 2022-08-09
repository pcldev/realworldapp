interface IPostCommentProps {
  isAuthenticated?: any;
  bodyRef?: any;
  setBody?: (value: any) => void;
  onSubmit?: (event: any) => void;
}

const PostComment = (props: IPostCommentProps) => {
  const { isAuthenticated, bodyRef, setBody, onSubmit } = props;

  if (!isAuthenticated) return <></>;
  return (
    <form className="card comment-form" onSubmit={onSubmit}>
      <div className="card-block">
        <textarea
          ref={bodyRef}
          onChange={(e) => setBody(e.target.value)}
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={isAuthenticated?.image}
          className="comment-author-img"
          alt=""
        />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  );
};

export default PostComment;
