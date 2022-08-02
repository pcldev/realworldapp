import React from "react";
import { NavLink } from "react-router-dom";
import Input from "../../helpers/Input";

interface ILoginComponentProps {
  error?: string;
  email?: string;
  emailRef?: any;
  password?: string;
  passwordRef?: any;
  onChange?: (value: string, type: string) => void;
  onSubmitFormHandle?: (event: any) => void;
}

const LoginComponent = (props: ILoginComponentProps) => {
  const {
    error,
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
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <NavLink to="/register">Need an account?</NavLink>
            </p>

            <ul className="error-messages">{error && <li>{error}</li>}</ul>

            <form onSubmit={onSubmitFormHandle}>
              <Input
                ref={emailRef}
                state="email"
                value={email}
                onChange={onChange}
                type="email"
                placeholder="Email"
              />

              <Input
                ref={passwordRef}
                state="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
              />
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
