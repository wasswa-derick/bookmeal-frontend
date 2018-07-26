import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { RegistrationForm } from "../common/forms";
import { registerCustomer } from "../../actions/auth";
/**
 * @class Signup
 * @extends {React.Component}
 */
export class Signup extends React.Component {
  /**
   * @param {object} data to submit
   * @returns {Promise} promise to the caller
   * @memberof Signup
   */
  handleSubmit = data =>
    this.props
      .registerCustomer(data)
      .then(() => this.props.history.push("/login"));

  /**
   * @returns {any} renders a page
   * @memberof Signup
   */
  render() {
    return (
      <div>
        <div className="container login-panel">
          <div className="card auth-card">
            <div className="card-body">
              <h3 className="card-title title">Create your Account</h3>
              <RegistrationForm handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  registerCustomer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default connect(null, { registerCustomer })(Signup);
