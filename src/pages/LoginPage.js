import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginForm from "../components/forms/LoginForm";
import { loginUser } from "../actions/auth";
import AppNavBar from "../components/NavBar";
/**
 * @class LoginPage
 * @extends {React.Component}
 */
export class LoginPage extends React.Component {
  /**
   * @param {object} data to submit
   * @returns {Promise} promise to the caller
   * @memberof LoginPage
   */
  handleSubmit = data =>
    this.props.loginUser(data).then(() => this.props.history.push("/"));

  /**
   * @returns {any} renders a page
   * @memberof LoginPage
   */
  render() {
    return (
      <div>
        <AppNavBar />
        <div className="container login-panel">
          <div className="card auth-card">
            <div className="card-body">
              <h3 className="card-title title">Log Into Your Account</h3>
              <LoginForm handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default connect(null, { loginUser })(LoginPage);
