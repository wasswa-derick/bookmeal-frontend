import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import validator from "validator";
import moment from "moment";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import FormInput from "../../components/forms/FormInput";
import InlineError from "../../components/InlineError";
import { setMessage } from "../../actions/message";
import { getMeals } from "../../actions/meals";
import { addMenu } from "../../actions/menus";

/**
 * @export
 * @class NewMenuPage
 * @extends {React.Component}
 */
export class NewMenuPage extends React.Component {
  state = {
    data: {
      title: "",
      description: ""
    },
    menuDate: moment(),
    errors: {},
    meals: []
  };
  componentWillMount = () => {
    this.props.getMeals().catch(() => {});
  };

  onSubmit = () => {
    const { meals, data, menuDate } = this.state;
    let errors = this.validate(data);

    // validate the date as well
    if (menuDate == null) {
      errors.date = "This field is required";
    }

    if (Object.keys(errors).length === 0) {
      if (meals.length === 0) {
        this.props.setMessage({
          text: "Select at least one meal to put on the menu",
          type: "danger"
        });
        return;
      }

      this.props
        .addMenu({
          title: data.title,
          description: data.description,
          date: menuDate.format("YYYY-MM-DD"),
          meals
        })
        .then(() => {
          this.props.setMessage({
            text: `New Menu ${data.title}  has been created successfully`,
            type: "info"
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
   * @memberof NewMenuPage
   */
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  /**
   * @param {Event} evt
   * @param {Number} id
   * @returns {null} void
   * @memberof NewMenuPage
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
   * @memberof NewMenuPage
   */
  validate = data => {
    const errors = {};
    if (validator.isEmpty(data.title)) {
      errors.title = "This field is required";
    }

    if (validator.isEmpty(data.description)) {
      errors.description = "This field is required";
    }

    return errors;
  };

  /**
   * @param {Date} date
   * @returns {null} null
   * @memberof NewMenuPage
   */
  handleDateChange = date => {
    this.setState({
      menuDate: date
    });
  };

  /**
   *
   * @returns {null} elements to render
   * @memberof NewMenuPage
   */
  render() {
    const { data, errors } = this.state;
    const { meals } = this.props;
    return (
      <div className="container">
        <button onClick={this.onSubmit} className="btn btn-primary float-right">
          Save
        </button>
        <h4>Create New Menu</h4>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <FormInput
              value={data.title}
              type="text"
              name="title"
              onChange={this.onChange}
              label="Title"
              error={errors.title}
            />
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="date">Menu Date</label>
              <DatePicker
                className={
                  errors.date ? "form-control is-invalid" : "form-control"
                }
                onChange={this.handleDateChange}
                selected={this.state.menuDate}
              />
              {errors.date && (
                <p style={{ color: "#dc3545", fontSize: "80%" }}>
                  {errors.date}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <textarea
                className={
                  errors.description
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="description"
                id="desc"
                cols="20"
                rows="2"
                onChange={this.onChange}
                value={data.description}
              />
              {errors.description && <InlineError text={errors.description} />}
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="menu-image">Attach Image</label>
              <input className="form-control" type="file" name="menu-image" />
            </div>
          </div>
        </div>
        <div className="row">
          {meals.map(meal => (
            <div key={meal.id} className="col-md-3">
              <div className="meal-o">
                <div className="meal-actions">
                  <input
                    onChange={evt => this.checked(evt, meal.id)}
                    type="checkbox"
                    className="form-check-input"
                  />
                </div>
                <div className="row meal-detail ml-2">
                  <h6>{meal.title}</h6>
                  <label htmlFor="price">UGX {meal.price}</label>
                  <p>{meal.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

NewMenuPage.propTypes = {
  setMessage: PropTypes.func.isRequired,
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
  }).isRequired
};

const mapStateToProps = state => ({
  meals: state.mealsReducer.meals
});

export default connect(mapStateToProps, { setMessage, getMeals, addMenu })(
  NewMenuPage
);
