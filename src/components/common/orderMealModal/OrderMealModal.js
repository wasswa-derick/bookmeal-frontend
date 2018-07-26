import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";

/**
 * @export
 * @class OrderMeal
 * @extends {React.Component}
 */
export class OrderMealModal extends React.Component {
  state = {
    order: {
      menuId: 0,
      meals: [],
      totalCost: 0,
      orderCount: 1,
      cost: 0
    },
    checkedMeals: []
    // loaded: false;
  };

  componentWillMount = () => {
    const { order, selectedMenu } = this.props;
    this.sortAndSetCheckedMeals({ order, selectedMenu });
  };

  /**
   * @param {Object} props
   * @returns {null} void
   * @memberof OrderMealModal
   */
  componentWillReceiveProps = props => {
    this.sortAndSetCheckedMeals(props);
  };
  /**
   * @param {Object} props
   *@returns {null} void
   * @memberof OrderMealModal
   */
  sortAndSetCheckedMeals = props => {
    const { order, selectedMenu } = props;
    const checkedMeals = selectedMenu.meals.map(meal => {
      const orderMeal = order.meals.find(m => m.id === meal.id);
      if (orderMeal == null) {
        return { ...meal, checked: false };
      }
      return { ...meal, checked: true };
    });
    let mealsCost = 0;
    order.meals.forEach(m => {
      mealsCost += m.price;
    });
    order.cost = mealsCost * order.orderCount;
    this.setState({ order, checkedMeals });
  };

  /**
   * @param {Event} evt
   * @param {boolean} flag
   * @returns {null} null
   * @memberof HomePage
   */
  incrementCount = (evt, flag) => {
    let { orderCount } = this.state.order;
    switch (flag) {
      case false:
        if (orderCount === 1) break;
        orderCount -= 1;
        break;
      case true:
        orderCount += 1;
        break;
      default:
        break;
    }

    const cost = this.state.order.totalCost * orderCount;
    this.setState({ order: { ...this.state.order, orderCount, cost } });
  };

  /**
   * @param {Event} evt
   * @param {Number} id
   * @returns {null} void
   */
  checked = (evt, id) => {
    // find that meal
    const { checkedMeals } = this.state;
    const meal = checkedMeals.find(_meal => _meal.id === id);

    const { meals } = this.state.order;
    let { totalCost } = this.state.order;
    switch (evt.target.checked) {
      case true:
        totalCost += meal.price;
        meal.checked = true;
        meals.push(meal);
        break;
      case false:
        totalCost -= meal.price;
        meal.checked = false;
        meals.pop(meal);
        break;
      default:
        break;
    }

    const cost = this.state.order.orderCount * totalCost;
    this.setState({ order: { ...this.state.order, meals, totalCost, cost } });
  };

  makeOrder = () => {
    // remove this modal
    $(".modal-backdrop").remove();
    this.props.submit(this.state.order);
  };

  /**
   * @returns {div} a modal
   * @memberof OrderMeal
   */
  render() {
    const { selectedMenu } = this.props;
    const { order, checkedMeals } = this.state;

    return (
      <div className="modal fade" id="orderModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="mealModalLabel">
                {selectedMenu.title}
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
              {checkedMeals.map(meal => (
                <div key={meal.id} className="form-group meal-order-item">
                  <input
                    onChange={evt => this.checked(evt, meal.id)}
                    type="checkbox"
                    checked={meal.checked}
                  />
                  <label htmlFor="title" className="ml-2">
                    {meal.title}
                  </label>
                  <label
                    className="float-right"
                    style={{ color: "#00a1e0" }}
                    htmlFor="price"
                  >
                    UGX{meal.price}
                  </label>
                  <p style={{ fontSize: "14px" }}>
                    <i>{meal.description}</i>
                  </p>
                </div>
              ))}
              <hr />
              <div className="row">
                <div className="col-md-5 input-group">
                  <div className="input-group-prepend">
                    <button
                      onClick={evt => this.incrementCount(evt, false)}
                      className="btn btn-primary"
                    >
                      <i className="fa fa-minus" />
                    </button>
                  </div>

                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={order.orderCount}
                  />
                  <div className="input-group-prepend">
                    <button
                      onClick={evt => this.incrementCount(evt, true)}
                      className="btn btn-primary"
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <div
                  style={{ textAlign: "center", fontWeight: "bold" }}
                  className="col-md-4"
                >
                  UGX {order.cost}
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    disabled={order.cost === 0}
                    onClick={this.makeOrder}
                    className="btn-save btn btn-primary"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrderMealModal.propTypes = {
  selectedMenu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    meals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
    orderCount: PropTypes.number.isRequired,
    meals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  submit: PropTypes.func.isRequired
};

export default OrderMealModal;
