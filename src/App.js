import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import "./css";
import HomePage from "./pages/HomePage";
import ConnectedSignup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import ConnectedBusinessSignupPage from "./pages/BusinessSignupPage";

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signup" exact component={ConnectedSignup} />
      <Route
        path="/business/signup"
        exact
        component={ConnectedBusinessSignupPage}
      />
      <Route path="/login" exact component={LoginPage} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
