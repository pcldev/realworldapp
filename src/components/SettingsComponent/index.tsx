import React from "react";
import Input from "../../helpers/Input";

interface ISettingsComponentProps {
  error: String;
  image: string;
  username: string;
  bio: string;
  email: string;
  password: string;
  onChangeHandler: (value: string, type: string) => void;
  onSubmitHandler: () => void;
  onLogoutHandler: () => void;
}

const SettingsComponent = (props: ISettingsComponentProps) => {
  const {
    error,
    image,
    username,
    bio,
    email,
    password,
    onChangeHandler,
    onSubmitHandler,
    onLogoutHandler,
  } = props;
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {error && <li>{error}</li>}
            <form onSubmit={onSubmitHandler}>
              <fieldset>
                <Input
                  state="image"
                  value={image}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="URL of profile picture"
                />
                <Input
                  state="username"
                  value={username}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Your Name"
                />
                <fieldset className="form-group">
                  <textarea
                    value={bio}
                    onChange={(e) => onChangeHandler(e.target.value, "bio")}
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>

                <Input
                  state="email"
                  value={email}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Email"
                />

                <Input
                  state="password"
                  value={password}
                  onChange={onChangeHandler}
                  type="password"
                  placeholder="Password"
                />

                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              onClick={onLogoutHandler}
              className="btn btn-outline-danger "
            >
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
