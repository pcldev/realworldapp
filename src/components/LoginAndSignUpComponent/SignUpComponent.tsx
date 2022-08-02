import React from "react";
import { NavLink } from "react-router-dom";
import Input from "../../helpers/Input";

interface ISignUpComponentProps {
  error?: string;
  username?: string;
  email?: string;
  password?: string;
  usernameRef?: any;
  emailRef?: any;
  passwordRef?: any;
  onChange?: (value: string, type: string) => void;
  onSubmitFormHandle: (event: any) => void;
}
const SignUpComponent = (props: ISignUpComponentProps) => {
  const {
    error,
    username,
    usernameRef,
    email,
    emailRef,
    password,
    passwordRef,
    onChange,
    onSubmitFormHandle,
  } = props;
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <NavLink to="/login">Have an account?</NavLink>
            </p>

            <ul className="error-messages">{error && <li>{error}</li>}</ul>

            <form onSubmit={onSubmitFormHandle}>
              <Input
                state="username"
                ref={usernameRef}
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Your Name"
              />
              <Input
                state="email"
                ref={emailRef}
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email"
              />
              <Input
                state="password"
                ref={passwordRef}
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
              />
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
