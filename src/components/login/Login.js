import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LoginForm } from "../common/forms";
import { loginUser } from "../../actions/auth";
/**
 * @class Login
 * @extends {React.Component}
 */
export class Login extends React.Component {
  /**
   * @param {object} data to submit
   * @returns {Promise} promise to the caller
   * @memberof Login
   */
  handleSubmit = data =>
    this.props.loginUser(data).then(() => this.props.history.push("/"));

  /**
   * @returns {any} renders a page
   * @memberof Login
   */
  render() {
    return (
      <div>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default connect(null, { loginUser })(Login);
