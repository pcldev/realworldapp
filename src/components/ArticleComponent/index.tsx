import { Link, NavLink } from "react-router-dom";
import ButtonFollow from "../../helpers/ButtonFollow";
import ButtonFavorite from "../../helpers/ButtonHeart";
import { IArticle } from "../../models/Article";
import { IComment } from "../../models/Comment";
import { IUser } from "../../models/UserProfile";
import CommentsComponent from "./CommentsComponent";
import PostComment from "./PostComment";

interface IArticleComponentProps {
  isAuthenticated?: any;
  article?: IArticle;
  user?: IUser;
  comments: IComment[];
  pending?: boolean;
  bodyRef?: any;
  setBody?: (value: any) => void;
  setPending?: (value: any) => void;
  setUser?: (value: any) => void;
  setArticle?: (value: any) => void;
  onSubmitCommentHandler?: (event: any) => void;
  onDeleteCommentHandler?: (id: Number) => void;
  onDeleteArticleHandler?: () => void;
}

const ArticleComponent = (props: IArticleComponentProps) => {
  const {
    isAuthenticated,
    article,
    comments,
    user,
    pending,
    bodyRef,
    setBody,
    setPending,
    setUser,
    setArticle,
    onSubmitCommentHandler,
    onDeleteCommentHandler,
    onDeleteArticleHandler,
  } = props;

  const ButtonComponent = () => {
    return (
      <>
        {isAuthenticated?.username === article.author.username ? (
          <>
            <Link
              to={`/editor/${article.slug}`}
              className="btn btn-outline-secondary btn-sm"
            >
              <i className="ion-edit"></i> Edit Article
            </Link>
            <button
              onClick={onDeleteArticleHandler}
              className="btn btn-outline-danger btn-sm"
            >
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </>
        ) : (
          <>
            <ButtonFollow
              setPending={setPending}
              setUser={setUser}
              user={user}
              pending={pending}
            />
            &nbsp;&nbsp;
            <ButtonFavorite
              slug={article.slug}
              favorited={article.favorited}
              article={article}
              setArticle={setArticle}
            >
              &nbsp; Favorite Post{" "}
              <span className="counter">
                ({article.favoritesCount.toString()})
              </span>
            </ButtonFavorite>
          </>
        )}
      </>
    );
  };
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <NavLink to={`/@${article.author.username}`}>
              <img src={article.author.image.toString()} alt="" />
            </NavLink>
            <div className="info">
              <NavLink to={`/@${article.author.username}`} className="author">
                {article.author.username}
              </NavLink>
              <span className="date">{article.createdAt}</span>
            </div>
            <ButtonComponent />
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.description}</p>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <NavLink to={`/@${article.author.username}`}>
              <img src={article.author.image.toString()} alt="" />
            </NavLink>
            <div className="info">
              <NavLink to={`/@${article.author.username}`} className="author">
                {article.author.username}
              </NavLink>
              <span className="date">{article.createdAt}</span>
            </div>
            <ButtonComponent />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <PostComment
              bodyRef={bodyRef}
              onSubmit={onSubmitCommentHandler}
              setBody={setBody}
              isAuthenticated={isAuthenticated}
            />
            {comments &&
              comments.map((comment) => (
                <CommentsComponent
                  isAuthenticated={isAuthenticated}
                  comment={comment}
                  onDeleteCommentHandler={onDeleteCommentHandler}
                  key={comment.id.toString()}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleComponent;
