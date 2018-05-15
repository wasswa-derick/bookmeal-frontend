import React from "react";
import RegistrationForm from "../components/forms/RegistrationForm";

const Signup = () => (
  <div className="container login-panel">
    <div className="card auth-card">
      <div className="card-body">
        <h3 className="card-title title">Create your Account</h3>
        <RegistrationForm />
      </div>
    </div>
  </div>
);

export default Signup;
