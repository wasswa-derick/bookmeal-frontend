import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import "./css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signup" exact component={Signup} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
