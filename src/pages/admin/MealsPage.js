import React from "react";
import { connect } from "react-redux";
import validator from "validator";
import PropTypes from "prop-types";
import Loader from "react-loader";
import { Link } from "react-router-dom";
import MealOption from "../../components/admin/Meal";
import Footer from "../../components/Footer";
import FormInput from "../../components/forms/FormInput";
import InlineError from "../../components/InlineError";
import { logoutUser } from "../../actions/auth";
import { getMeals, postMeal, deleteMeal } from "../../actions/meals";
import { setMessage } from "../../actions/message";

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
 * @class MealsPage
 * @extends {React.Component}
 */
export class MealsPage extends React.Component {
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
    this.props.getMeals().catch(() => {});
    this.setState({ loaded: true });
  };

  /**
   *@param {Event} e change event
   *@return {null} nothing
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
        .postMeal(data)
        .then(() => window.location.reload())
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
    this.props
      .deleteMeal(mealId)
      .then(() => window.location.reload())
      .catch(err => {
        switch (err.response.status) {
          case 401:
            this.props.logoutUser();
            window.location.reload();
            break;
          case 500:
            this.props.setMessage({
              text: "Internal server error",
              type: "danger"
            });
            break;
          default:
            break;
        }
      });
  };

  /**
   * @param {Object} data
   *@returns {Object} of errors
   */
  validate = data => {
    const errors = [];
    if (validator.isEmpty(data.price)) {
      errors.price = "This field is required";
    } else if (!validator.isNumeric(data.price)) {
      errors.price = "Price value should be a number";
    }else if(data.price <= 0){
      errors.price = 'Price value cannot be less or equal to zero';
    }

    if (validator.isEmpty(data.title)) {
      errors.title = "This field is required";
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

          <div className="modal fade" id="confirmDel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="mealModalLabel">
                    Confirm Deletion
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
                  <p>Are you sure you want to remove this meal.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    No
                  </button>
                  <button
                    onClick={this.confirmDeletion}
                    type="button"
                    className="btn btn-primary"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

MealsPage.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  getMeals: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  postMeal: PropTypes.func.isRequired,
  deleteMeal: PropTypes.func.isRequired
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
  logoutUser,
  setMessage,
  postMeal,
  deleteMeal
})(MealsPage);
