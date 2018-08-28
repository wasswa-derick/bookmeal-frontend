import React from "react";
import { connect } from "react-redux";
import validator from "validator";
import PropTypes from "prop-types";
import Loader from "react-loader";
import $ from "jquery";
import { Link } from "react-router-dom";
import { MealOption, Footer, InlineError } from "../../common";
import { FormInput } from "../../common/forms";
import { getMeals, postMeal, deleteMeal } from "../../../actions/meals";
import { setMessage } from "../../../actions/message";
import DeleteModal from "../deleteModal/DeleteModal";

const EditLink = ({ id }) => (
  <Link
    className="btn btn-link"
    href={`/admin/meal/${id}/edit`}
    to={`/admin/meal/${id}/edit`}
  >
    <i className="fa fa-edit" />
  </Link>
);

EditLink.propTypes = {
  id: PropTypes.number.isRequired
};

/**
 * @export
 * @class Meals
 * @extends {React.Component}
 */
export class Meals extends React.Component {
  state = {
    data: {
      title: "",
      price: "",
      description: ""
    },
    errors: {},
    loaded: false,
    mealId: 0
  };

  componentWillMount = () => {
    this.props.getMeals().then(() => this.setState({ loaded: true }));
  };

  /**
   * @param {Event} e change event
   * @return {null} nothing
   */
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const { data } = this.state;
    let errors = this.validate(data);
    if (Object.keys(errors).length === 0) {
      this.props
        .postMeal({ ...data, price: parseInt(data.price, 10) })
        .then(() => {
          this.props.getMeals();
          $("#close-btn").click();
          this.props.setMessage({
            text: "Meal added successfully",
            show: true
          });
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
   *@param {number} id
   *@return {null} null
   */
  deleteMeal = id => {
    this.setState({ mealId: id });
  };

  confirmDeletion = () => {
    const { mealId } = this.state;
    this.props.deleteMeal(mealId).then(() => {
      $("#btn-no").click();
      this.props.setMessage({
        text: "Meal deleted successfully",
        show: true
      });
    });
  };

  /**
   * @param {Object} data
   * @returns {Object} of errors
   */
  validate = data => {
    const errors = [];
    if (validator.isEmpty(String(data.price))) {
      errors.price = "This field is required";
    } else if (!validator.isNumeric(String(data.price))) {
      // cast to string as validator only works with strings
      errors.price = "Price value should be a number";
    } else if (data.price <= 0) {
      errors.price = "Price value cannot be less or equal to zero";
    }

    if (validator.isEmpty(data.title)) {
      errors.title = "This field is required";
    } else if (data.title.length > 64) {
      errors.title = "This field value should less than 64 characters long.";
    }

    if (validator.isEmpty(data.description)) {
      errors.description = "This field is required";
    }
    return errors;
  };

  /**
   * @returns {any} rendered elements
   */
  render() {
    const { meals } = this.props;

    const { data, errors, loaded } = this.state;
    return (
      <div>
        <div className="container">
          <section>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#mealModal"
              >
                New Meal
              </button>
            </div>
          </section>
          <Loader loaded={loaded}>
            <div className="row">
              {meals.map(meal => (
                <MealOption
                  key={meal.id}
                  meal={meal}
                  delete={this.deleteMeal}
                  editLink={EditLink}
                />
              ))}
            </div>
          </Loader>
          <div className="modal fade" id="mealModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="mealModalLabel">
                    New Meal
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <FormInput
                      name="title"
                      type="text"
                      label="Title"
                      value={data.title}
                      error={errors.title}
                      onChange={this.onChange}
                    />
                    <FormInput
                      name="price"
                      type="text"
                      label="Price"
                      value={String(data.price)}
                      onChange={this.onChange}
                      error={errors.price}
                    />
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
                        rows="5"
                        onChange={this.onChange}
                        value={data.description}
                      />
                      {errors.description && (
                        <InlineError text={errors.description} />
                      )}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    id="close-btn"
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={this.onSubmit}
                    className="btn-save btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DeleteModal title="meal" confirmDeletion={this.confirmDeletion} />
        </div>
        <Footer />
      </div>
    );
  }
}

Meals.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  getMeals: PropTypes.func.isRequired,
  postMeal: PropTypes.func.isRequired,
  deleteMeal: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
};

/**
 * @param {any} state
 * @returns {Object} props mapped from redux state
 */
const mapStateToProps = state => ({
  meals: state.mealsReducer.meals
});

export default connect(mapStateToProps, {
  getMeals,
  postMeal,
  deleteMeal,
  setMessage
})(Meals);
