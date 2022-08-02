import React from "react";
import ProfileAPI from "../../api/Profile";
import { IProfile, IProfileResponse } from "../../models/UserProfile";

interface IButtonFollowProps {
  onClick?: () => void;
  pending?: boolean;
  user?: any;
  setUser?: (user: IProfileResponse) => void;
  setPending?: (value: boolean) => void;
}

const ButtonFollow = (props: IButtonFollowProps) => {
  const { onClick, pending, user, setUser, setPending } = props;

  const onClickHandler = async () => {
    setPending(true);
    try {
      if (user.following) {
        const response = await ProfileAPI.deleteUnFollowUser(user.username);
        setUser(response.data.profile);
      } else {
        const response = await ProfileAPI.postFollowAUser(user.username);
        setUser(response.data.profile);
      }
      setPending(false);
    } catch (err) {
      console.log(err);
      setPending(false);
    }
  };
  return (
    <>
      {user && (
        <button
          onClick={onClickHandler}
          className="btn btn-sm btn-outline-secondary action-btn"
          disabled={pending}
        >
          <i className={`ion-${user.following ? "minus" : "plus"}-round`}></i>
          &nbsp; {user.following ? "Unfollow" : "Follow"} {user.username}
        </button>
      )}
    </>
  );
};

export default ButtonFollow;
