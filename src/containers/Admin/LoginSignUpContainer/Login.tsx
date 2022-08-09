import React, { useRef, useState } from "react";
import UserAndAuthenAPI from "../../../api/UserAndAuthentication";
import { setUser } from "../../../commons/storage";
import LoginComponent from "../../../components/LoginAndSignUpComponent/LoginComponent";
const LoginContainer = () => {
  document.title = "Sign In -- Conduit";
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<any>(null);
  const onSubmitFormHandle = async (event: React.FormEvent) => {
    event.preventDefault();
    emailRef.current.disabled = true;
    passwordRef.current.disabled = true;
    try {
      const response = await UserAndAuthenAPI.postExistingUserLogin({
        email,
        password,
      });
      setUser(response.data.user);
      window.location.href = "/";
    } catch (err) {
      setError(err);
      emailRef.current.disabled = false;
      passwordRef.current.disabled = false;
    }
  };

  const onChangeHandler = (value: string, type: string) => {
    const obj = {
      email: setEmail,
      password: setPassword,
    };

    obj[type](value);
  };

  return (
    <LoginComponent
      error={error}
      email={email}
      password={password}
      emailRef={emailRef}
      passwordRef={passwordRef}
      onChange={onChangeHandler}
      onSubmitFormHandle={onSubmitFormHandle}
    />
  );
};

export default LoginContainer;
