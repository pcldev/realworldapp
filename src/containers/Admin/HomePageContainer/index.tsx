import { useCallback, useEffect, useMemo, useState } from "react";
import ArticlesAPI from "../../../api/Articles";
import { getUser } from "../../../commons/storage";
import { IMultipleArticlesReponse } from "../../../models/Article";

import DefaultAPI from "../../../api/Default";

import HomePageComponent from "../../../components/HomePageComponent";
import { ITagsResponse } from "../../../models/Comment";

const HomePageContainer = () => {
  document.title = "Home -- Conduit";
  const isAuthenticated = useMemo(() => getUser(), []);

  const [articles, setArticles] = useState<IMultipleArticlesReponse>();
  const [articlesFollowing, setArticlesFollowing] =
    useState<IMultipleArticlesReponse>();
  const [tags, setTags] = useState<ITagsResponse>();
  const [tag, setTag] = useState<String>("");

  const [activeTab, setActiveTab] = useState<number>(1);

  const onChangeTabHandler = (value: number) => {
    if (value === activeTab) return;
    if (value !== 2) setTag("");
    setActiveTab(value);
  };

  const onGetArticleFollowingsHandler = useCallback(async () => {
    if (!isAuthenticated) return;
    setArticlesFollowing(null);
    try {
      const response = await ArticlesAPI.getRecentArticlesUserFollowing();
      setArticlesFollowing(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [isAuthenticated]);

  const onGetArticlesGlobally = useCallback(async () => {
    setArticles(null);

    try {
      let params = {};
      let response: any;
      if (tag.trim() !== "") {
        params = { ...params, tag: tag };
      }
      if (activeTab === 2) {
        response = await ArticlesAPI.getArticlesGlobally(params);
      } else {
        response = await ArticlesAPI.getArticlesGlobally();
      }
      setArticles(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [tag, activeTab]);

  const onGetTagsReponse = useCallback(async () => {
    try {
      const response = await DefaultAPI.getTags();
      setTags(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    onGetArticlesGlobally();
    onGetArticleFollowingsHandler();
    onGetTagsReponse();
  }, [onGetArticlesGlobally, onGetArticleFollowingsHandler, onGetTagsReponse]);
  return (
    <HomePageComponent
      isAuthenticated={isAuthenticated}
      tags={tags}
      tag={tag}
      setTag={setTag}
      activeTab={activeTab}
      articles={articles}
      articlesFollowing={articlesFollowing}
      onChangeTabHandler={onChangeTabHandler}
    />
  );
};

export default HomePageContainer;
