import React from "react";
import { connect } from "react-redux";
import validator from "validator";
import moment from "moment";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import { getMeals } from "../../../actions/meals";
import { setMessage } from "../../../actions/message";
import { addMenu } from "../../../actions/menus";
import AddMenuForm from "../addMenu/addMenuForm";

/**
 * @export
 * @class NewMenu
 * @extends {React.Component}
 */
export class NewMenu extends React.Component {
  state = {
    data: {
      title: "",
      description: ""
    },
    menuDate: moment(),
    errors: {},
    meals: []
  };
  componentDidMount = () => {
    this.props.getMeals();
  };

  onSubmit = () => {
    const { meals, data, menuDate } = this.state;
    let errors = this.validate(data);

    if (Object.keys(errors).length === 0) {
      if (meals.length === 0) {
        this.props.setMessage({
          text: `Select at least one meal to put on the menu`,
          show: true
        });
        return;
      }
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("menu_date", menuDate.format("YYYY-MM-DD"));
      formData.append("meals", meals);
      formData.append("imageFile", data.imageFile);

      this.props
        .addMenu(formData)
        .then(() => {
          this.props.setMessage({
            text: `New Menu ${data.title}  has been created successfully`,
            show: true
          });
          this.props.history.push("/admin/menus");
        })
        .catch(err => {
          if (err.response.status && err.response.status === 400) {
            errors = { ...err.response.data.errors };
          }
          this.setState({ errors });
        });
    }

    this.setState({ errors });
  };

  /**
   * @param {Event} e
   * @returns {null} null
   * @memberof NewMenu
   */
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  /**
   * @param {Event} evt
   * @param {Number} id
   * @returns {null} void
   * @memberof NewMenu
   */
  checked = (evt, id) => {
    const { meals } = this.state;
    switch (evt.target.checked) {
      case true:
        meals.push(id);
        break;
      case false:
        meals.pop(id);
        break;
      default:
        break;
    }
    this.setState({ meals });
  };

  /**
   * @param {Object} data
   * @returns {Object} of errors
   * @memberof NewMenu
   */
  validate = data => {
    const errors = {};
    if (validator.isEmpty(data.title)) {
      errors.title = "This field is required";
    }

    if (validator.isEmpty(data.description)) {
      errors.description = "This field is required";
    }

    // validate the date as well
    if (this.state.menuDate == null) {
      errors.menu_date = "This field is required";
    }
    return errors;
  };

  /**
   * @param {Date} date
   * @returns {null} null
   * @memberof NewMenu
   */
  handleDateChange = date => {
    this.setState({
      menuDate: date
    });
  };

  /**
   * @param {Event} e
   * @returns {null} null
   * @memberof NewMenu
   */
  handleFileUpload = e =>
    this.setState({
      data: { ...this.state.data, imageFile: e.target.files[0] }
    });

  /**
   *
   * @returns {null} elements to render
   * @memberof NewMenu
   */
  render() {
    const { data, errors, menuDate } = this.state;
    const { meals } = this.props;
    return (
      <div className="container">
        <AddMenuForm
          title="Create New Menu"
          data={data}
          errors={errors}
          menuDate={menuDate}
          meals={meals}
          onChange={this.onChange}
          handleDateChange={this.handleDateChange}
          handleFileUpload={this.handleFileUpload}
          checked={this.checked}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

NewMenu.propTypes = {
  getMeals: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  addMenu: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  setMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  meals: state.mealsReducer.meals
});

export default connect(mapStateToProps, { getMeals, addMenu, setMessage })(
  NewMenu
);
