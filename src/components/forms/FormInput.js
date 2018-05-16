import React from "react";
import PropTypes from "prop-types";
import InlineError from "../InlineError";

const FormInput = ({ value, type, name, label, onChange, error }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      className={error ? "form-control is-invalid" : "form-control"}
      type={type}
      id={name}
      autoComplete="off"
      value={value}
      name={name}
      onChange={onChange}
    />
    {error && <InlineError text={error} />}
  </div>
);

FormInput.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

FormInput.defaultProps = {
  error: undefined
};

export default FormInput;
