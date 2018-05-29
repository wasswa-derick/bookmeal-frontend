import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const AuthenticatedRoute = ({
  isUserAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isUserAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

AuthenticatedRoute.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

/**
 * @param {any} state
 * @returns {Object} props mapped from redux state
 */
function mapStateToProps(state) {
  return {
    isUserAuthenticated: !!state.authReducer.user.isLoggedIn
  };
}

export default connect(mapStateToProps)(AuthenticatedRoute);
