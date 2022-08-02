import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonFavorite from "../../helpers/ButtonHeart";
import { IArticle, ISingleArticleResponse } from "../../models/Article";

interface IArticlePreviewComponentProps {
  article?: IArticle;
}

const ArticlePreviewComponent = (props: IArticlePreviewComponentProps) => {
  const { article: articleValue } = props;

  const [article, setArticle] = useState<ISingleArticleResponse | any>(
    articleValue
  );

  const {
    slug,
    author,
    createdAt,
    favorited,
    favoritesCount,
    title,
    description,
  } = articleValue;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <NavLink to={`/@${author.username}`}>
          <img src={author.image.toString()} alt="" />
        </NavLink>
        <div className="info">
          <NavLink to={`/@${author.username}`} className="author">
            {author.username}
          </NavLink>
          <span className="date">{createdAt}</span>
        </div>
        <ButtonFavorite
          article={article}
          setArticle={setArticle}
          favorited={favorited}
          slug={slug}
        >
          {favoritesCount.toString()}
        </ButtonFavorite>
      </div>
      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default ArticlePreviewComponent;
