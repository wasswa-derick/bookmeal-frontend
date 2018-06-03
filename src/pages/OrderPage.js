import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import { getCartOrder, postOrder } from "../actions/orders";
import { setMessage } from "../actions/message";

/**
 * @export
 * @class OrderPage
 * @extends {React.Component}
 */
export class OrderPage extends React.Component {
  state = {
    loaded: false
  };
  componentWillMount = () => {
    this.props.getCartOrder();
    this.setState({ loaded: true });
  };
  cancelOrder = () => {
    sessionStorage.removeItem("cartOrder");
    this.props.history.push("/");
  };
  makeOrder = () => {
    const { meals, menuId, orderCount } = this.props.cartOrder;
    this.props
      .postOrder({ meals: meals.map(m => m.id), menuId, orderCount })
      .then(() => {
        sessionStorage.removeItem("cartOrder");
        this.props.setMessage({
          text: `Your order has been placed. thank you`,
          type: "info"
        });
        this.props.history.push("/orders");
      })
      .catch(err => console.log(err));
  };

  /**
   * @returns {div} renders a div
   * @memberof OrderPage
   */
  render() {
    const { meals, cost, orderCount, totalCost } = this.props.cartOrder;
    const { loaded } = this.state;
    return (
      <div className="container">
        {meals.length === 0 ? (
          <div>
            <h4>Empty Order Cart</h4>
          </div>
        ) : (
          <div>
            <h4>Confirm Meals Order:</h4>
          </div>
        )}
        <hr />
        <Loader loaded={loaded}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Meal Title</th>
                <th>Meal Description</th>
                <th>Meal Price</th>
              </tr>
            </thead>

            <tbody>
              {meals.map(meal => (
                <tr key={meal.id}>
                  <td>{meal.title}</td>
                  <td>
                    <p>{meal.description}</p>
                  </td>
                  <td>
                    <label htmlFor="price">UGX {meal.price}</label>
                  </td>
                  {/* <td>
                    <i className="fa fa-remove" />
                  </td> */}
                </tr>
              ))}
              <tr>
                <td />
                <td>
                  <label style={{ fontWeight: "bold" }} htmlFor="total">
                    {orderCount} Orders X {totalCost}/= :
                  </label>
                  <br />
                  <label style={{ color: " #00a1e0" }} htmlFor="cost">
                    {" "}
                    Total: UGX {cost}
                  </label>
                </td>
                <td>
                  <button
                    onClick={this.cancelOrder}
                    className="btn btn-danger mr-4"
                  >
                    Cancel
                  </button>
                  <button onClick={this.makeOrder} className="btn btn-success">
                    Confirm
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Loader>
      </div>
    );
  }
}

OrderPage.propTypes = {
  cartOrder: PropTypes.shape({
    menuId: PropTypes.number.isRequired,
    meals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    totalCost: PropTypes.number.isRequired,
    orderCount: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getCartOrder: PropTypes.func.isRequired,
  postOrder: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cartOrder: state.ordersReducer.cartOrder
});

export default connect(mapStateToProps, {
  getCartOrder,
  postOrder,
  setMessage
})(OrderPage);
