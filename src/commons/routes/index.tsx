import ArticleContainer from "../../containers/Admin/Article";
import CreateEditArticleContainer from "../../containers/Admin/CreateEditArticleContainer";
import HomePageContainer from "../../containers/Admin/HomePageContainer";
import LoginContainer from "../../containers/Admin/LoginSignUpContainer/Login";
import SignUpContainer from "../../containers/Admin/LoginSignUpContainer/SignUp";
import ProfileContainer from "../../containers/Admin/ProfileContainer";
import SettingsContainer from "../../containers/Admin/SettingsContainer";

import { Navigate, useRoutes } from "react-router-dom";
import { getUser } from "../storage";

export default function Router() {
  const isAuthencated = getUser();

  const routeAdmin = [
    {
      path: "/",
      element: <HomePageContainer />,
    },
    {
      path: "/editor",
      element: <CreateEditArticleContainer />,
    },
    {
      path: "/settings",
      element: <SettingsContainer />,
    },
    {
      path: "/article/:slug",
      element: <ArticleContainer />,
    },
    {
      path: "/editor/:slug",
      element: <CreateEditArticleContainer />,
    },
    {
      path: `/@:username`,
      element: <ProfileContainer />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];

  const routeDefault = [
    {
      path: "/",
      element: <HomePageContainer />,
    },

    {
      path: "/login",
      element: <LoginContainer />,
    },
    {
      path: "/register",
      element: <SignUpContainer />,
    },
    {
      path: "/article/:slug",
      element: <ArticleContainer />,
    },
    {
      path: `/@:username`,
      element: <ProfileContainer />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];

  return useRoutes(isAuthencated ? routeAdmin : routeDefault);
}
