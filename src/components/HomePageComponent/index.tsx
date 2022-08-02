import { Link } from "react-router-dom";
import ArticlePreviewComponent from "../../commons/layouts/ArticlePreview";
import PopularTagsComponent from "../../commons/layouts/PopularTags";
import Tabs from "../../helpers/Tabs";
import { IMultipleArticlesReponse } from "../../models/Article";

import { v4 as uuidv4 } from "uuid";
import { ITagsResponse } from "../../models/Comment";
interface IHomePageComponentProps {
  isAuthenticated: boolean;
  activeTab: number;
  tags: ITagsResponse;
  articlesFollowing: IMultipleArticlesReponse;
  articles: IMultipleArticlesReponse;
  onChangeTabHandler: (value: number) => void;
}

const HomePageComponent = (props: IHomePageComponentProps) => {
  const {
    isAuthenticated,
    tags,
    activeTab,
    articles,
    articlesFollowing,
    onChangeTabHandler,
  } = props;
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isAuthenticated && (
                  <li className="nav-item">
                    <Link
                      onClick={onChangeTabHandler.bind(null, 0)}
                      className={`nav-link ${activeTab === 0 ? "active" : ""}`}
                      to=""
                    >
                      Your Feed
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link
                    onClick={onChangeTabHandler.bind(null, 1)}
                    className={`nav-link ${isAuthenticated ? "" : "active"} ${
                      activeTab === 1 ? "active" : ""
                    }`}
                    to=""
                  >
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-9">
            <Tabs activeTab={activeTab}>
              {isAuthenticated &&
                (articlesFollowing ? (
                  articlesFollowing.articles.length > 0 ? (
                    articlesFollowing.articles.map((article: any) => (
                      <ArticlePreviewComponent
                        key={uuidv4()}
                        article={article}
                      />
                    ))
                  ) : (
                    <p>You don't follow anyone</p>
                  )
                ) : (
                  <div style={{ marginTop: "10px" }}>
                    <p>Loading your feed...</p>
                  </div>
                ))}
              {articles ? (
                articles.articles.map((article: any) => (
                  <ArticlePreviewComponent key={uuidv4()} article={article} />
                ))
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <p>Loading articles...</p>
                </div>
              )}
            </Tabs>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags ? (
                  tags.tags.map((tag) => (
                    <PopularTagsComponent key={uuidv4()} tag={tag} />
                  ))
                ) : (
                  <p>Loading Tags</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
