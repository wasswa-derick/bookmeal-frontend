import React from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FormInput from "./FormInput";

/**
 * @class RegistrationForm
 * @extends {React.Component}
 */
class RegistrationForm extends React.Component {
  state = {
    data: {
      name: "",
      email: "",
      password: ""
    },
    errors: {}
  };

  /**
   * @param {Event} evt
   *@returns {null} sets value of target element to the corresponding state value
   */
  onChange = evt => {
    this.setState({
      data: { ...this.state.data, [evt.target.name]: evt.target.value }
    });
  };
  /**
   *@param {Event} evt
   * @returns {null} returns null
   */
  onFormSubmit = evt => {
    evt.preventDefault();
    const { data } = this.state;
    let errors = this.validateData(data);

    if (Object.keys(errors).length === 0) {
      this.props.handleSubmit(data).catch(err => {
        switch (err.response.status) {
          case 500:
            errors.form = "Internal server error occured";
            break;
          case 400:
            errors = { ...err.response.data.errors };
            break;
          default:
            break;
        }
        this.setState({ errors });
      });
    }

    this.setState({ errors });
  };
  /**
   *@param {Object} data
   * @returns {Object} errors object
   */
  validateData = data => {
    const errors = {};
    if (validator.isEmpty(data.email)) {
      errors.email = "This field is required";
    } else if (!validator.isEmail(data.email)) {
      errors.email = "This email is invalid";
    }
    if (validator.isEmpty(data.password)) {
      errors.password = "This field is required";
    }
    if (validator.isEmpty(data.name)) {
      errors.name = "This field is required";
    }
    return errors;
  };

  /**
   * @returns {form} for registration
   */
  render() {
    const { data, errors } = this.state;
    return (
      <form autoComplete="off" onSubmit={this.onFormSubmit}>
        <FormInput
          value={data.name}
          type="text"
          name="name"
          label="Full Name"
          onChange={this.onChange}
          error={errors.name}
        />
        <FormInput
          name="email"
          type="email"
          label="Email"
          value={data.email}
          onChange={this.onChange}
          error={errors.email}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          value={data.password}
          onChange={this.onChange}
          error={errors.password}
        />
        <button type="submit" className="btn btn-primary btn-submit">
          Create Account
        </button>
        <p>
          Already have an account?
          <Link href="/login" to="/login">
            Log In
          </Link>
        </p>
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default RegistrationForm;
