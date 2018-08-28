import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import validator from "validator";
import moment from "moment";
import { getMenu, editMenu } from "../../../actions/menus";
import { setMessage } from "../../../actions/message";
import { getMeals } from "../../../actions/meals";
import AddMenuForm from "../addMenu/addMenuForm";

/**
 * @export
 * @class EditMenuPage
 * @extends {React.Component}
 */
export class EditMenu extends React.Component {
  state = {
    loaded: false,
    errors: {},
    meals: [],
    menuDate: " ",
    data: {
      title: "",
      description: ""
    }
  };
  componentDidMount = () => {
    this.props.getMeals();
    const { id } = this.props.match.params;
    this.props.getMenu(id).then(() => {
      const meals = this.props.meals.map(meal => {
        const checkedMeal = this.props.menu.meals.find(m => m.id === meal.id);
        if (checkedMeal === undefined) {
          return { ...meal, checked: false };
        }
        return { ...checkedMeal, checked: true };
      });

      this.setState({
        loaded: true,
        meals,
        menuDate: moment(this.props.menu.menuDate),
        data: this.props.menu
      });
    });
  };

  onSubmit = () => {
    const { meals, data, menuDate } = this.state;
    let errors = this.validate(data);

    if (Object.keys(errors).length === 0) {
      const filteredMeals = meals.filter(m => m.checked === true);
      const addedMeals = filteredMeals.map(m => m.id);
      if (addedMeals.length === 0) {
        this.props.setMessage({
          text: `Select at least one meal to put on the menu`,
          type: "danger"
        });

        return;
      }
      const formData = {
        title: data.title,
        description: data.description,
        menu_date: menuDate.format("YYYY-MM-DD"),
        meals: addedMeals
      };

      this.props
        .editMenu(this.props.match.params.id, formData)
        .then(() => {
          this.props.setMessage({
            text: `New Menu ${data.title}  has been created successfully`,
            type: "success"
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
   * @param {Event} evt
   * @param {Number} id
   * @returns {null} void
   * @memberof NewMenu
   */
  checked = (evt, id) => {
    const { meals } = this.state;
    switch (evt.target.checked) {
      case true:
        meals.forEach(m => {
          if (m.id === id) {
            m.checked = true;
          }
        });
        break;
      case false:
        meals.forEach(m => {
          if (m.id === id) {
            m.checked = false;
          }
        });
        break;
      default:
        break;
    }
    this.setState({ meals });
  };

  /**
   * @returns {HTMLElement} div
   * @memberof EditMenu
   */
  render() {
    const { loaded, errors, meals, menuDate, data } = this.state;
    return (
      <div className="container">
        <Loader loaded={loaded}>
          <AddMenuForm
            title="Edit menu"
            data={data}
            meals={meals}
            menuDate={menuDate}
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
  }).isRequired,
  getMeals: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  setMessage: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  editMenu: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  menu: state.menusReducer.menu,
  meals: state.mealsReducer.meals
});

export default connect(mapStateToProps, {
  getMenu,
  getMeals,
  setMessage,
  editMenu
})(EditMenu);
