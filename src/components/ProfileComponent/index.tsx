import React from "react";
import ArticlePreviewComponent from "../../commons/layouts/ArticlePreview";
import Tabs from "../../helpers/Tabs";

import { v4 as uuidv4 } from "uuid";
import ButtonFollow from "../../helpers/ButtonFollow";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../models/UserProfile";
import { IMultipleArticlesReponse } from "../../models/Article";

interface IProfileComponentProps {
  user?: IUser;
  currentUser?: IUser;
  myArticles?: IMultipleArticlesReponse;
  favoritedArticles?: IMultipleArticlesReponse;
  pending?: boolean;
  activeTab?: number;
  setPending?: (value: any) => void;
  setUser?: (value: any) => void;
  onChangeTabHandler(value: number): void;
}

const ProfileComponent = (props: IProfileComponentProps) => {
  const navigate = useNavigate();
  const {
    user,
    currentUser,
    myArticles,
    favoritedArticles,
    pending,
    activeTab,
    setPending,
    setUser,
    onChangeTabHandler,
  } = props;
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={`${user.image || "http://i.imgur.com/Qr71crq.jpg"}`}
                className="user-img"
                alt=""
              />
              <h4>{user.username}</h4>
              <p>{user.bio || "You have no bio yet!"}</p>
              {user.username === currentUser.username ? (
                <button
                  onClick={() => {
                    navigate("/settings");
                  }}
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </button>
              ) : (
                <ButtonFollow
                  setPending={setPending}
                  setUser={setUser}
                  user={user}
                  pending={pending}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    onClick={onChangeTabHandler.bind(null, 0)}
                    className={`nav-link ${activeTab === 0 ? "active" : ""}`}
                    to=""
                  >
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={onChangeTabHandler.bind(null, 1)}
                    className={`nav-link ${activeTab === 1 ? "active" : ""}`}
                    to=""
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <Tabs activeTab={activeTab}>
              {myArticles ? (
                myArticles.articles.length > 0 ? (
                  myArticles.articles.map((article: any) => (
                    <ArticlePreviewComponent key={uuidv4()} article={article} />
                  ))
                ) : (
                  <p>You don't have any articles</p>
                )
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <p>Loading articles...</p>
                </div>
              )}
              {favoritedArticles ? (
                favoritedArticles.articles.length > 0 ? (
                  favoritedArticles.articles.map((article: any) => (
                    <ArticlePreviewComponent key={uuidv4()} article={article} />
                  ))
                ) : (
                  <div style={{ marginTop: "10px" }}>
                    <p>You haven't favorited any articles</p>
                  </div>
                )
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <p>Loading articles...</p>
                </div>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
