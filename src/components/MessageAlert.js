import React from "react";
import PropTypes from "prop-types";

export const getAlert = type => {
  switch (type) {
    case "success":
      return "alert alert-success";
    case "danger":
      return "alert alert-danger";
    case "warning":
      return "alert alert-warning";
    case "info":
    default:
      return "alert alert-info";
  }
};

const MessageAlert = ({ text, type }) => {
  const alertType = getAlert(type);
  return (
    <div className={alertType} role="alert">
      {text}
    </div>
  );
};

MessageAlert.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default MessageAlert;
