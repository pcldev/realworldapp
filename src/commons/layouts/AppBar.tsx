import React from "react";
import { getUser } from "../storage";
import Header from "./Header";
const AppBar = () => {
  const isAuthencated = getUser();
  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
};

export default AppBar;
