import React, { useRef, useState } from "react";
import UserAndAuthenAPI from "../../../api/UserAndAuthentication";
import { setUser } from "../../../commons/storage";
import SignUpComponent from "../../../components/LoginAndSignUpComponent/SignUpComponent";
const SignUpContainer = () => {
  document.title = "Sign Up -- Conduit";
  const [username, setUsername] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [error, setError] = useState<any>(null);
  const onSubmitFormHandle = async (event: React.FormEvent) => {
    event.preventDefault();
    usernameRef.current.disabled = true;
    emailRef.current.disabled = true;
    passwordRef.current.disabled = true;
    try {
      const response = await UserAndAuthenAPI.postRegisterANewUser({
        username,
        email,
        password,
      });
      setUser(response.data.user);
      window.location.href = "/";
    } catch (err) {
      setError(err);
      usernameRef.current.disabled = false;
      emailRef.current.disabled = false;
      passwordRef.current.disabled = false;
    }
  };

  const onChangeHandler = (value: string, type: string) => {
    const obj = {
      username: setUsername,
      email: setEmail,
      password: setPassword,
    };

    obj[type](value);
  };
  return (
    <SignUpComponent
      error={error}
      username={username}
      email={email}
      password={password}
      emailRef={emailRef}
      passwordRef={passwordRef}
      usernameRef={usernameRef}
      onSubmitFormHandle={onSubmitFormHandle}
      onChange={onChangeHandler}
    />
  );
};

export default SignUpContainer;
