import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a className="navbar-brand" href="./index.html">
      Book A meal
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="./index.html">
            Home
            <span className="sr-only">(current)</span>
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">
            Menu
          </a>
        </li> */}
      </ul>
      <ul className="navbar-nav pull-right">
        {/* <li className="nav-item">
          <a className="nav-link" href="./caterer_signup.html">
            Sign up as caterer
          </a>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" href="/signup" to="/signup">
            Sign up as customer
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
