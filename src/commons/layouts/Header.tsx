import React from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../storage";

const Header = () => {
  const isAuthencated = getUser();
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink
              className={`nav-link ${({ isActive }: any) =>
                isActive ? "active" : ""}`}
              to="/"
            >
              Home
            </NavLink>
          </li>

          {isAuthencated ? (
            <>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${({ isActive }: any) =>
                    isActive ? "active" : ""}`}
                  to="/editor"
                >
                  <i className="ion-compose"></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${({ isActive }: any) =>
                    isActive ? "active" : ""}`}
                  to="/settings"
                >
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${({ isActive }: any) =>
                    isActive ? "active" : ""}`}
                  to={`@${isAuthencated.username || isAuthencated.email}`}
                >
                  {isAuthencated.username || isAuthencated.email}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
