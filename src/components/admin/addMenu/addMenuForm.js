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
  menu,
  errors,
  menuDate,
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
          value={menu.title}
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
            className={errors.date ? "form-control is-invalid" : "form-control"}
            onChange={handleDateChange}
            selected={menuDate}
          />
          {errors.date && (
            <p style={{ color: "#dc3545", fontSize: "80%" }}>{errors.date}</p>
          )}
        </div>
      </div>
      <div className="col-md-3">
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            className={
              errors.description ? "form-control is-invalid" : "form-control"
            }
            name="description"
            id="desc"
            cols="20"
            rows="2"
            onChange={onChange}
            value={menu.description}
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
      {menu.meals.map(meal => (
        <div key={meal.id} className="col-md-3">
          <div className="meal-o">
            <div className="meal-actions">
              <input
                onChange={evt => checked(evt, meal.id)}
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
  menu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string,
    meals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default AddMenuForm;
