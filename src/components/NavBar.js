import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/auth";

/**
 * @export
 * @class NavBar
 * @extends {React.Component}
 */
export class NavBar extends React.Component {
  logout = () => {
    this.props.logoutUser();
    window.location.reload();
  };
  /**
   * @returns {any} rendered elements
   */
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link className="navbar-brand" href="/" to="/">
          Book A Meal
        </Link>
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
              <Link className="nav-link" href="/" to="/">
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          {this.props.isUserAuthenticated ? (
            <ul className="navbar-nav pull-right">
              <li className="nav-item">
                <button
                  className="btn btn-primary nav-link"
                  onClick={this.logout}
                >
                  Log out
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav pull-right">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/business/signup"
                  to="/business/signup"
                >
                  Sign up as a caterer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/signup" to="/signup">
                  Sign up as customer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/login" to="/login">
                  Log In
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};
/**

 * @param {any} state 
 * @returns {Object} mapped props from state
 */
function mapStateToProps(state) {
  return {
    isUserAuthenticated: !!state.authReducer.user.id
  };
}

export default connect(mapStateToProps, { logoutUser })(NavBar);
