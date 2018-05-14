import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container">
    <h1>404: Page Not Found</h1>
    <Link href="/" to="/">
      Home
    </Link>
  </div>
);

export default NotFound;
