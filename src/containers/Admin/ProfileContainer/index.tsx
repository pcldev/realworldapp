import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileAPI from "../../../api/Profile";
import { getUser } from "../../../commons/storage";
import { IProfileResponse, IUser } from "../../../models/UserProfile";

import ArticlesAPI from "../../../api/Articles";
import ProfileComponent from "../../../components/ProfileComponent";
import { IMultipleArticlesReponse } from "../../../models/Article";

const currentUser: IUser = getUser();

const ProfileContainer = () => {
  const params = useParams();

  const [user, setUser] = useState<IProfileResponse | any>(currentUser);
  const [myArticles, setMyArticles] = useState<IMultipleArticlesReponse>();
  const [favoritedArticles, setfavoritedArticles] =
    useState<IMultipleArticlesReponse>();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [pending, setPending] = useState<boolean>(false);

  const onChangeTabHandler = (value: number) => {
    if (value === activeTab) return;
    setActiveTab(value);
  };

  const onGetUserProfile = useCallback(async () => {
    try {
      const userResponse = await ProfileAPI.getAProfile(params.username);
      setUser(userResponse.data.profile);
    } catch (err) {
      console.log(err);
    }
  }, [params.username]);

  const onGetMyArticles = useCallback(async () => {
    try {
      const response = await ArticlesAPI.getArticlesGlobally({
        author: params.username,
      });
      setMyArticles(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [params.username]);

  const onGetFavoritedArticles = useCallback(async () => {
    try {
      const response = await ArticlesAPI.getArticlesGlobally({
        favorited: params.username,
      });
      setfavoritedArticles(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [params.username]);

  useEffect(() => {
    onGetUserProfile();
    onGetFavoritedArticles();
    onGetMyArticles();
  }, [onGetUserProfile, onGetMyArticles, onGetFavoritedArticles, activeTab]);

  return (
    <>
      {user && (
        <ProfileComponent
          user={user}
          currentUser={currentUser}
          myArticles={myArticles}
          favoritedArticles={favoritedArticles}
          pending={pending}
          activeTab={activeTab}
          setPending={setPending}
          setUser={setUser}
          onChangeTabHandler={onChangeTabHandler}
        />
      )}
    </>
  );
};

export default ProfileContainer;
