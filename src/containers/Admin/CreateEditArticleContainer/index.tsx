import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticlesAPI from "../../../api/Articles";
import CreateArticleComponent from "../../../components/CreateAndEditComponent/CreateArticleComponent";

const CreateEditArticleContainer = () => {
  document.title = "Editor -- Conduit";
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const [error, setError] = useState<string>("");

  const onGetArticle = useCallback(async () => {
    if (!params.slug) return;
    try {
      const response = await ArticlesAPI.getAnArticle(params.slug);
      const data = response.data.article;
      if (!data) return;
      setTitle(data.title);
      setDescription(data.description);
      setBody(data.body);
      setTags(data.tagList.join(", "));
    } catch (err) {
      console.log(err);
    }
  }, [params.slug]);

  useEffect(() => {
    onGetArticle();
  }, [onGetArticle]);

  const onSubmitHandler = async (event: FormEvent, type: string) => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();

    try {
      if (type === "create") {
        const response = await ArticlesAPI.postCreateAnArticle({
          title,
          description,
          body,
          tagList: tags.trim().split(" "),
        });
        navigate("/");
      } else {
        console.log(title, description, body, tags);
        const response = await ArticlesAPI.putUpdateAnArticle(params.slug, {
          title,
          description,
          body,
          tagList: tags.trim().split(" "),
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const onChangeHandler = (value: string, type: string) => {
    const obj = {
      title: setTitle,
      description: setDescription,
      body: setBody,
      tags: setTags,
    };
    obj[type](value);
  };
  return (
    <CreateArticleComponent
      error={error}
      title={title}
      description={description}
      body={body}
      tags={tags}
      onChange={onChangeHandler}
      onSubmitHandler={onSubmitHandler}
    />
  );
};

export default CreateEditArticleContainer;
