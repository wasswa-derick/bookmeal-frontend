import React from "react";
import { Link } from "react-router-dom";
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
  onSubmit = evt => {
    evt.preventDefault();
  };

  /**
   * @returns {form} for registration
   */
  render() {
    const { data, errors } = this.state;
    return (
      <form autoComplete="off" onSubmit={this.onSubmit}>
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
        <button type="submit" className="btn btn-primary">
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

export default RegistrationForm;
