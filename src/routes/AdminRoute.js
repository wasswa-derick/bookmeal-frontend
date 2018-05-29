import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const AdminRoute = ({
  isUserAuthenticated,
  isAdmin,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isUserAuthenticated) {
        return isAdmin ? <Component {...props} /> : <Redirect to="/" />;
      }
      return <Redirect to="/login" />;
    }}
  />
);

AdminRoute.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

/**
 * @param {any} state
 * @returns {Object} props mapped from redux state
 */
function mapStateToProps(state) {
  return {
    isUserAuthenticated: !!state.authReducer.user.isLoggedIn,
    isAdmin: !!state.authReducer.user.isAdmin
  };
}

export default connect(mapStateToProps)(AdminRoute);
