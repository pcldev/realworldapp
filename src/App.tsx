import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./commons/layouts/Footer";
import Header from "./commons/layouts/Header";
import Router from "./commons/routes";

function App() {
  let location = useLocation();
  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
