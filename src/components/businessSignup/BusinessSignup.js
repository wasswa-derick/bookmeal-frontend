import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BusinessSignupForm } from "../common/forms";
import { registerBusiness } from "../../actions/auth";
/**
 * @class Signup
 * @extends {React.Component}
 */
export class BusinessSignup extends React.Component {
  /**
   * @param {object} data to submit
   * @returns {Promise} promise to the caller
   */
  handleSubmit = data =>
    this.props
      .registerBusiness(data)
      .then(() => this.props.history.push("/login"));

  /**
   * @returns {any} renders a page
   */
  render() {
    return (
      <div>
        <div className="container login-panel">
          <div className="card auth-card">
            <div className="card-body">
              <h3 className="card-title title">Create Your Business Account</h3>
              <BusinessSignupForm handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BusinessSignup.propTypes = {
  registerBusiness: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default connect(null, { registerBusiness })(BusinessSignup);
