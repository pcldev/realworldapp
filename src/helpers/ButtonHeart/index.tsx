import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoritesAPI from "../../api/Favorites";
import { getUser } from "../../commons/storage";
import { IArticle, ISingleArticleResponse } from "../../models/Article";

interface IButtonFavoriteProps {
  children: React.ReactNode;
  slug?: String;
  favorited?: Boolean;
  article?: IArticle;
  setArticle?: (value: IArticle) => void;
  className?: any;
}

const ButtonFavorite = (props: IButtonFavoriteProps) => {
  const { slug, article, setArticle, className } = props;
  const isAuthenticated = getUser();
  const navigate = useNavigate();
  const [pending, setPending] = useState<boolean>(false);

  const onChangeFavoriteSlugHandler = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setPending(true);
    try {
      if (article.favorited) {
        const response = await FavoritesAPI.deleteUnfavoriteAnArticle(slug);
        setArticle(response.data.article);
      } else {
        const response = await FavoritesAPI.postFavoriteAnArticle(slug);
        setArticle(response.data.article);
      }
      setPending(false);
    } catch (err) {
      console.log(err);
      setPending(false);
    }
  };
  return (
    <button
      onClick={onChangeFavoriteSlugHandler}
      className={`btn btn-outline-primary btn-sm ${className} ${
        article.favorited ? "active" : ""
      }`}
      disabled={pending}
    >
      <i className="ion-heart"></i> {props.children}
    </button>
  );
};

export default ButtonFavorite;
