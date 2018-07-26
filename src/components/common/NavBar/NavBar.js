import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../../actions/auth";
import MessageAlert from "../messageAlert/MessageAlert";

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
    const { text, type } = this.props;
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
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

              {this.props.isUserAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" href="/orders" to="/orders">
                    My Orders
                  </Link>
                </li>
              )}

              {this.props.isAdmin ? (
                <ul className="navbar-nav pull-left">
                  <li className="nav-item">
                    <Link className="nav-link" href="/admin" to="/admin">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="/admin/meals"
                      to="/admin/meals"
                    >
                      Meals
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="/admin/menus"
                      to="/admin/menus"
                    >
                      Menus
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="/admin/orders"
                      to="/admin/orders"
                    >
                      Order History
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul />
              )}
            </ul>
            {this.props.isUserAuthenticated ? (
              <ul className="navbar-nav pull-right">
                <li className="nav-item active">
                  <button
                    className="btn-logout btn btn-primary nav-link"
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
        <div className="container">
          {text && <MessageAlert text={text} type={type} />}
        </div>
      </header>
    );
  }
}

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  type: PropTypes.string,
  text: PropTypes.string
};

NavBar.defaultProps = {
  type: undefined,
  text: undefined
};
/**

 * @param {any} state
 * @returns {Object} mapped props from state
 */
function mapStateToProps(state) {
  return {
    isUserAuthenticated: !!state.authReducer.user.isLoggedIn,
    isAdmin: !!state.authReducer.user.isAdmin,
    text: state.messageReducer.message.text,
    type: state.messageReducer.message.type
  };
}

export default connect(mapStateToProps, { logoutUser })(NavBar);
