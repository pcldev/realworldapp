import { useState } from "react";
import UserAndAuthenAPI from "../../../api/UserAndAuthentication";
import { deleteToken, getUser, setUser } from "../../../commons/storage";
import SettingsComponent from "../../../components/SettingsComponent";

const SettingsContainer = () => {
  document.title = "Settings -- Conduit";
  const {
    bio: bioValue,
    email: emailValue,
    image: imageValue,
    username: usernameValue,
  } = getUser();

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState(usernameValue || "");
  const [bio, setBio] = useState(bioValue || "");
  const [image, setImage] = useState(imageValue || "");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const onLogoutHandler = () => {
    deleteToken();
    window.location.href = "/";
  };

  const onSubmitHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const body = { email, username, image, bio, password };
    let user = {};
    for (const key in body) {
      if (body[key].trim() !== "") {
        user[key] = body[key];
      }
    }
    try {
      const response = await UserAndAuthenAPI.putUpdateCurrentUser(body);
      if (response.status === 200) {
        setUser(response.data.user);
        window.location.href = `/@${response.data.user.username}`;
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const onChangeHandler = (value: string, type: string) => {
    const obj = {
      email: setEmail,
      username: setUsername,
      bio: setBio,
      image: setImage,
      password: setPassword,
    };

    obj[type](value);
  };

  return (
    <SettingsComponent
      error={error}
      image={image}
      username={username}
      password={password}
      bio={bio}
      email={email}
      onChangeHandler={onChangeHandler}
      onSubmitHandler={onSubmitHandler}
      onLogoutHandler={onLogoutHandler}
    />
  );
};

export default SettingsContainer;
