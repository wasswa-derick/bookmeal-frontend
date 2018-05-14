import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import "./App.css";
import HomePage from "./pages/HomePage";

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route component={NotFound} />
    </Switch>{" "}
  </div>
);

export default App;
