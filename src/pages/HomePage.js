import React from "react";
import AppNavBar from "../components/NavBar";
import banner from "../img/banner.jpeg";

const HomePage = () => (
  <div>
    <AppNavBar />
    <div className="app-banner">
      <p>Everyday we present one featured menu</p>
      <p>Allowing you to choose from the different meals and order</p>
      <img className="img-fluid" src={banner} alt="logo" />
    </div>
  </div>
);

export default HomePage;
