import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BusinessSignupForm from "../components/forms/BusinessSignupForm";
import { registerBusiness } from "../actions/auth";
import AppNavBar from "../components/NavBar";
/**
 * @class Signup
 * @extends {React.Component}
 */
export class BusinessSignupPage extends React.Component {
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
        <AppNavBar />
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

BusinessSignupPage.propTypes = {
  registerBusiness: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default connect(null, { registerBusiness })(BusinessSignupPage);
