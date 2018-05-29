import React from "react";
import PropTypes from "prop-types";

import coffeeImg from "../../img/coffee.jpg";

/**
 * @export
 * @class Meal
 * @extends {React.Component}
 */
class Meal extends React.Component {
  delete = () => {
    this.props.delete();
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
          <div className="meal-actions">
            <button onClick={this.delete} className="btn btn-link btn-del">
              <i className="fa fa-close" />
            </button>
            {EditLink && <EditLink />}
          </div>
          <div className="thumbnail">
            <img src={coffeeImg} alt="" />
          </div>
          <div className="meal-detail">
            <h5>
              {title}:
              <span>UGX {price}</span>
            </h5>
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
