import React from "react";
import PropTypes from "prop-types";

/**
 * @export
 * @class Meal
 * @extends {React.Component}
 */
class Meal extends React.Component {
  delete = () => {
    const { id } = this.props.meal;
    this.props.delete(id);
  };

  /**
   *
   * @returns {any} elements to render
   */
  render() {
    const { title, id, description, price } = this.props.meal;
    const EditLink = this.props.editLink;
    return (
      <div key={id} className="col-md-3">
        <div className="meal-o">
          <div>
            <button
              onClick={this.delete}
              data-toggle="modal"
              data-target="#confirmDel"
              className="btn btn-link btn-del"
            >
              <i className="fa fa-close" />
            </button>
            {EditLink && <EditLink id={id} />}
          </div>
          <div className="row meal-detail ml-2">
            <h6>{title}</h6>
            <label htmlFor="price">UGX {price}</label>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}
Meal.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  delete: PropTypes.func.isRequired,
  editLink: PropTypes.func
};

Meal.defaultProps = {
  editLink: undefined
};
export default Meal;
