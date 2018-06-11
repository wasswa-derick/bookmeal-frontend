import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import { postOrder } from "../actions/orders";
import { getMenu } from "../actions/menus";
import { setMessage } from "../actions/message";

/**
 * @export
 * @class OrderPage
 * @extends {React.Component}
 */
export class OrderPage extends React.Component {
  state = {
    loaded: false,
    order: {
      menuId: "",
      orderCount: 1,
      meals: [],
      cost: 0,
      totalCost: 0
    }
  };
  componentWillMount = () => {
    const { id } = this.props.match.params;
    this.setState({
      loaded: false,
      order: { ...this.state.order, menuId: id }
    });
    this.props
      .getMenu(id)
      .then(() => {})
      .catch(() => {});

    this.setState({ loaded: true });
  };
  cancelOrder = () => {
    this.props.history.push("/");
  };
  makeOrder = () => {
    const { meals, menuId, orderCount } = this.state.order;
    this.props
      .postOrder({
        meals: meals.map(m => m.id),
        menuId: parseInt(menuId, 10),
        orderCount
      })
      .then(() => {
        this.props.setMessage({
          text: `Your order has been placed. thank you`,
          type: "info"
        });
        this.props.history.push("/orders");
      })
      .catch(err => console.log(err));
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
    const { menu } = this.props;
    const meal = menu.meals.find(_meal => _meal.id === id);

    const { meals } = this.state.order;
    let { totalCost } = this.state.order;
    switch (evt.target.checked) {
      case true:
        totalCost += meal.price;
        meals.push(meal);
        break;
      case false:
        totalCost -= meal.price;
        meals.pop(meal);
        break;
      default:
        break;
    }

    const cost = this.state.order.orderCount * totalCost;
    this.setState({ order: { ...this.state.order, meals, totalCost, cost } });
  };

  /**
   * @returns {div} renders a div
   * @memberof OrderPage
   */
  render() {
    const { menu } = this.props;
    const { loaded, order } = this.state;
    return (
      <div className="container">
        <h5>{menu.title}</h5>
        <hr />
        <Loader loaded={loaded}>
          <div className="modal-body">
            {menu.meals.map(meal => (
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
                <p style={{ fontSize: "14px" }}>{meal.description}</p>
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
                <button
                  type="button"
                  onClick={this.cancelOrder}
                  className="btn btn-danger ml-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

OrderPage.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    menuDate: PropTypes.string.isRequired,
    url: PropTypes.string,
    meals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getMenu: PropTypes.func.isRequired,
  postOrder: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

const mapStateToProps = state => ({
  menu: state.menusReducer.menu
});

export default connect(mapStateToProps, {
  getMenu,
  postOrder,
  setMessage
})(OrderPage);
