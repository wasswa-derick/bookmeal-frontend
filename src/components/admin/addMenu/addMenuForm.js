import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { FormInput } from "../../common/forms";
import { InlineError } from "../../common";

/**
 * @export
 * @class AddMenuForm
 * @extends {React.Component}
 */
const AddMenuForm = ({
  data,
  errors,
  menuDate,
  meals,
  handleDateChange,
  handleFileUpload,
  onChange,
  onSubmit,
  checked,
  title
}) => (
  <div>
    <button onClick={onSubmit} className="btn-save btn btn-primary float-right">
      Save
    </button>
    <h4>{title}</h4>
    <hr />
    <div className="row">
      <div className="col-md-3">
        <FormInput
          value={data.title}
          type="text"
          name="title"
          onChange={onChange}
          label="Title"
          error={errors.title}
        />
      </div>
      <div className="col-md-3">
        <div className="form-group">
          <label htmlFor="date">Menu Date</label>
          <DatePicker
            className={
              errors.menu_date ? "form-control is-invalid" : "form-control"
            }
            onChange={handleDateChange}
            selected={menuDate}
          />
          {errors.menu_date && (
            <p style={{ color: "#dc3545", fontSize: "80%" }}>
              {errors.menu_date}
            </p>
          )}
        </div>
      </div>
      <div className="col-md-3">
        <div className="form-group">
          <label htmlFor="desc">
            Description <i>(40 characters)</i>
          </label>
          <textarea
            className={
              errors.description ? "form-control is-invalid" : "form-control"
            }
            name="description"
            id="desc"
            cols="20"
            rows="4"
            onChange={onChange}
            value={data.description}
          />
          {errors.description && <InlineError text={errors.description} />}
        </div>
      </div>
      <div className="col-md-3">
        <div className="form-group">
          <label htmlFor="menu-image">Attach Image</label>
          <input
            className={
              errors.imageFile ? "form-control is-invalid" : "form-control"
            }
            onChange={handleFileUpload}
            type="file"
            accept="image/x-png,image/jpeg,image/png"
            name="users-file"
          />
          {errors.imageFile && <InlineError text={errors.imageFile} />}
        </div>
      </div>
    </div>
    <div className="row">
      {meals.map(meal => (
        <div key={meal.id} className="col-md-3">
          <div className="meal-o">
            <div className="meal-actions">
              <input
                onChange={evt => checked(evt, meal.id)}
                checked={meal.checked && true}
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

AddMenuForm.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string
  }).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default AddMenuForm;
