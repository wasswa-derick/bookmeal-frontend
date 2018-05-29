import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import NotFound from "./NotFound";
import "./css";
import AppNavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ConnectedSignup from "./pages/Signup";
import ConnectedLoginPage from "./pages/LoginPage";
import ConnectedBusinessSignupPage from "./pages/BusinessSignupPage";
import AppGuestRoute from "./routes/GuestRoute";
import AppAdminRoute from "./routes/AdminRoute";
import AdminMealsPage from "./pages/admin/MealsPage";

const App = ({ location }) => (
  <div>
    <AppNavBar />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <AppGuestRoute path="/signup" exact component={ConnectedSignup} />
      <AppGuestRoute
        location={location}
        path="/business/signup"
        exact
        component={ConnectedBusinessSignupPage}
      />
      <AppGuestRoute
        location={location}
        path="/login"
        exact
        component={ConnectedLoginPage}
      />
      <AppAdminRoute
        location={location}
        path="/admin/meals"
        exact
        component={AdminMealsPage}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
