import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticlesAPI from "../../../api/Articles";
import CommentAPI from "../../../api/Comments";
import { getUser } from "../../../commons/storage";
import ArticleComponent from "../../../components/ArticleComponent";
import { ISingleArticleResponse } from "../../../models/Article";
import { IMultipleCommentsReponse } from "../../../models/Comment";
import { IProfile } from "../../../models/UserProfile";

const ArticleContainer = () => {
  document.title = "Article -- Conduit";

  const isAuthenticated = getUser();
  const params = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<ISingleArticleResponse | any>();
  const [comments, setComments] = useState<IMultipleCommentsReponse | any>();

  const [user, setUser] = useState<IProfile | any>();
  const [pending, setPending] = useState<boolean>();

  const [body, setBody] = useState<string>("");
  const bodyRef = useRef<any>();

  const onGetArticle = useCallback(async () => {
    try {
      const response = await ArticlesAPI.getAnArticle(params.slug);
      setUser(response.data.article.author);
      setArticle(response.data.article);
    } catch (err) {
      console.log(err);
    }
  }, [params.slug]);

  const onGetComments = useCallback(async () => {
    try {
      const response = await CommentAPI.getCommentForAnArticle(params.slug);
      setComments(response.data.comments);
    } catch (err) {
      console.log(err);
    }
  }, [params.slug]);

  useEffect(() => {
    onGetArticle();
    onGetComments();
  }, [onGetArticle, onGetComments]);

  const onSubmitCommentHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await CommentAPI.postCreateACommentForAnArticle(
        params.slug,
        { body }
      );
      bodyRef.current.value = "";
      onGetComments();
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteCommentHandler = async (id: Number) => {
    try {
      const response = await CommentAPI.deleteACommentForAnArticle(
        params.slug,
        id
      );
      onGetComments();
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteArticleHandler = async () => {
    try {
      const response = await ArticlesAPI.deleteDeleteAnArticle(params.slug);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(article);
  return (
    <>
      {article && (
        <ArticleComponent
          user={user}
          bodyRef={bodyRef}
          setBody={setBody}
          comments={comments}
          isAuthenticated={isAuthenticated}
          pending={pending}
          setArticle={setArticle}
          setPending={setPending}
          setUser={setUser}
          article={article}
          onSubmitCommentHandler={onSubmitCommentHandler}
          onDeleteCommentHandler={onDeleteCommentHandler}
          onDeleteArticleHandler={onDeleteArticleHandler}
        />
      )}
    </>
  );
};

export default ArticleContainer;
