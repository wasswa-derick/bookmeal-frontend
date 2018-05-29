import React from "react";
import { connect } from "react-redux";
import validator from "validator";
import PropTypes from "prop-types";
import Loader from "react-loader";
import MealOption from "../../components/admin/Meal";
import Footer from "../../components/Footer";
import FormInput from "../../components/forms/FormInput";
import InlineError from "../../components/InlineError";
import { logoutUser } from "../../actions/auth";
import { getMeals, postMeal } from "../../actions/meals";
import { setMessage } from "../../actions/message";

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
    loaded: false
  };
  componentWillMount = () => {
    this.props.getMeals().catch(err => {
      if (err.response.status === 500) {
        this.props.setMessage({
          text: "Internal server error",
          type: "danger"
        });
      } else if (err.response.status === 401) {
        this.props.logoutUser();
        this.props.setMessage({
          text: "Your session has expired, login again",
          type: "danger"
        });
        window.location.reload();
      } else if (err.response.status === 403) {
        this.props.setMessage({
          text: "Cannot fetch meals, access forbidden",
          type: "info"
        });
      }
    });

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
        .catch(err => {
          if (err.response.status === 400) {
            errors = { ...err.response.data.errors };
          }

          this.setState({ errors });
        })
        .then(() => window.location.reload());
    }
    this.setState({ errors });
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
              {meals.map(meal => <MealOption key={meal.id} meal={meal} />)}
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
                      value={data.price}
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

                    <input className="form-control" type="file" name="image" />
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
  postMeal: PropTypes.func.isRequired
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
  postMeal
})(MealsPage);
