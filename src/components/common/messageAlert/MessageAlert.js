import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import SweetAlert from "sweetalert-react"; // eslint-disable-line import/no-extraneous-dependencies
import "sweetalert/dist/sweetalert.css"; // eslint-disable-line import/no-extraneous-dependencies
import { setMessage } from "../../../actions/message";

/**
 * @class MessageAlert
 * @extends {React.Component}
 */
class MessageAlert extends React.Component {
  close = () => {
    this.props.setMessage({
      text: "",
      show: false
    });
  };

  /**
   * @returns {HTMLElement} div
   * @memberof MessageAlert
   */
  render() {
    const { text, show } = this.props;
    return (
      <SweetAlert
        show={show}
        title="Book a Meal Notification"
        html
        text={renderToStaticMarkup(<p>{text}</p>)}
        onConfirm={this.close}
      />
    );
  }
}

MessageAlert.propTypes = {
  text: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  setMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  text: state.messageReducer.message.text,
  show: state.messageReducer.message.show
});

export default connect(mapStateToProps, { setMessage })(MessageAlert);
