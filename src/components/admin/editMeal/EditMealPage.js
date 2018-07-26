import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader";
import validator from "validator";
import PropTypes from "prop-types";
import { FormInput } from "../../common/forms";
import { InlineError } from "../../common";
import { getMeal, editMeal } from "../../../actions/meals";

/**
 * @export
 * @class EditMealPage
 * @extends {React.Component}
 */
export class EditMealPage extends React.Component {
  state = {
    data: {
      title: "",
      price: "",
      description: ""
    },
    errors: {},
    loaded: true
  };

  componentWillMount = () => {
    const { id } = this.props.match.params;
    this.props
      .getMeal(id)
      .then(() => {
        const { meal } = this.props;
        this.setState({ data: { ...meal } });
      })
      .catch(() => {});
  };

  /**
   * @param {Event} e
   * @returns {null} sets state on target value on change
   * @memberof EditMealPage
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
        .editMeal({ ...data, price: parseInt(data.price, 10) })
        .then(() => {
          this.props.history.push("/admin/meals");
        })
        .catch(err => {
          switch (err.response.status) {
            case 400:
              errors = { ...err.response.data.errors };
              this.setState({ errors });
              break;
            default:
              break;
          }
        });
    } else {
      this.setState({ errors });
    }
  };

  /**
   * @param {Object} data
   *@returns {Object} of errors
   */
  validate = data => {
    const errors = [];
    if (validator.isEmpty(String(data.price))) {
      errors.price = "This field is required";
    } else if (!validator.isNumeric(String(data.price))) {
      errors.price = "Price value should be a number";
    } else if (data.price <= 0) {
      errors.price = "Price value cannot be less or equal to zero";
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
   *
   * @returns {null} elements to render
   * @memberof EditMealPage
   */
  render() {
    const { errors, data, loaded } = this.state;
    return (
      <div className="container">
        <h5>Edit Meal: {data.title}</h5>
        <Loader loaded={loaded}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" />
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
        </Loader>
      </div>
    );
  }
}

EditMealPage.propTypes = {
  getMeal: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  editMeal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  meal: state.mealsReducer.meal
});

export default connect(mapStateToProps, { getMeal, editMeal })(EditMealPage);
