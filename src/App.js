import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import NotFound from "./NotFound";
import "./assets";
import { NavBar } from "./components/common";
import {
  Home,
  Signup,
  Login,
  BusinessSignup,
  Order,
  CustomerOrders
} from "./components";
import { GuestRoute, AdminRoute, AuthenticatedRoute } from "./routes";

import {
  Meals,
  Menus,
  AdminOrdersHistory,
  Dashboard,
  EditMeal,
  NewMenu,
  EditMenu
} from "./components/admin";

const App = ({ location }) => (
  <div>
    <NavBar />
    <Switch>
      <Route path="/" exact component={Home} />
      <GuestRoute path="/signup" exact component={Signup} />
      <GuestRoute
        location={location}
        path="/business/signup"
        exact
        component={BusinessSignup}
      />
      <GuestRoute location={location} path="/login" exact component={Login} />
      <AdminRoute
        location={location}
        path="/admin/meals"
        exact
        component={Meals}
      />
      <AdminRoute
        location={location}
        path="/admin/meal/:id/edit"
        exact
        component={EditMeal}
      />

      <AdminRoute
        location={location}
        path="/admin/menus"
        exact
        component={Menus}
      />

      <AdminRoute
        location={location}
        path="/admin/menus/new"
        exact
        component={NewMenu}
      />

      <AdminRoute
        location={location}
        path="/admin/menus/:id/edit"
        exact
        component={EditMenu}
      />

      <AdminRoute
        location={location}
        path="/admin/orders"
        exact
        component={AdminOrdersHistory}
      />

      <AdminRoute
        location={location}
        path="/admin"
        exact
        component={Dashboard}
      />

      <AuthenticatedRoute
        location={location}
        path="/menu/:id/order"
        exact
        component={Order}
      />

      <AuthenticatedRoute
        location={location}
        path="/orders"
        exact
        component={CustomerOrders}
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
