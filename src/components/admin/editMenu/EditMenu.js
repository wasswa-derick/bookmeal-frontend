import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import { getMenu } from "../../../actions/menus";
import AddMenuForm from "../addMenu/addMenuForm";

/**
 * @export
 * @class EditMenuPage
 * @extends {React.Component}
 */
export class EditMenu extends React.Component {
  state = {
    loaded: false,
    errors: {}
  };
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props
      .getMenu(id)
      .then(() => {
        this.setState({ loaded: true });
      })
      .catch(err => {
        console.log(err);
        // TODO: show errors
      });
  };
  onSubmit = () => {};
  onChange = () => {};
  handleDateChange = () => {};
  handleFileUpload = () => {};
  checked = () => {};

  /**
   * @returns {HTMLElement} div
   * @memberof EditMenu
   */
  render() {
    const { loaded, errors } = this.state;
    const { menu } = this.props;
    return (
      <div className="container">
        <Loader loaded={loaded}>
          <AddMenuForm
            title="Edit menu"
            menu={menu}
            errors={errors}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            handleDateChange={this.handleDateChange}
            handleFileUpload={this.handleFileUpload}
            checked={this.checked}
          />
        </Loader>
      </div>
    );
  }
}

EditMenu.propTypes = {
  getMenu: PropTypes.func.isRequired,
  menu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    menuDate: PropTypes.string.isRequired,
    url: PropTypes.string,
    meals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  menu: state.menusReducer.menu
});

export default connect(mapStateToProps, { getMenu })(EditMenu);
