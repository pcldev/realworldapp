import { useCallback, useEffect, useMemo, useState } from "react";
import ArticlesAPI from "../../../api/Articles";
import { getUser } from "../../../commons/storage";
// import ArticlePreviewComponent from "../../../commons/layouts/ArticlePreview";
import { IMultipleArticlesReponse } from "../../../models/Article";

import DefaultAPI from "../../../api/Default";

import HomePageComponent from "../../../components/HomePageComponent";
import { ITagsResponse } from "../../../models/Comment";

const HomePageContainer = () => {
  const isAuthenticated = useMemo(() => getUser(), []);

  const [articles, setArticles] = useState<IMultipleArticlesReponse>();
  const [articlesFollowing, setArticlesFollowing] =
    useState<IMultipleArticlesReponse>();
  const [tags, setTags] = useState<ITagsResponse>();

  const [activeTab, setActiveTab] = useState<number>(1);

  const onChangeTabHandler = (value: number) => {
    if (value === activeTab) return;
    setActiveTab(value);
  };

  const onGetArticleFollowingsHandler = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const response = await ArticlesAPI.getRecentArticlesUserFollowing();
      setArticlesFollowing(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [isAuthenticated]);

  const onGetArticlesGlobally = useCallback(async () => {
    try {
      const response = await ArticlesAPI.getArticlesGlobally();
      setArticles(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

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
      activeTab={activeTab}
      articles={articles}
      articlesFollowing={articlesFollowing}
      onChangeTabHandler={onChangeTabHandler}
    />
  );
};

export default HomePageContainer;
