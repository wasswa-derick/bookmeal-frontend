import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Loader from "react-loader";
import PropTypes from "prop-types";
import { getOrders } from "../../actions/orders";

/**
 * @export
 * @class OrdersHistoryPage
 * @extends {React.Component}
 */
export class OrdersHistoryPage extends React.Component {
  state = {
    loaded: false
  };
  componentWillMount = () => {
    this.props
      .getOrders()
      .then(() => this.setState({ loaded: true }))
      .catch(() => {});
  };

  componentDidMount = () => {};

  componentDidUpdate = () => {};

  /**
   * @returns {null} renders elements
   * @memberof OrdersHistoryPage
   */
  render() {
    const { loaded } = this.state;
    const { orders } = this.props;
    return (
      <div className="container">
        <div>
          <h4>Order History</h4>
          <hr />
        </div>
        <Loader loaded={loaded}>
          <table id="dtable" className="table table-striped">
            <thead>
              <tr role="row">
                <th>Customer Name</th>
                <th>Customer Contact</th>
                <th>Order Count</th>
                <th>Meals Ordered</th>
                <th>Total Cost</th>
                <th>Date Ordered</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="even">
                  <td>{order.customer.name}</td>
                  <td>{order.customer.email}</td>
                  <td>{order.orderCount}</td>
                  <td>
                    {order.meals.map(meal => (
                      <li key={meal.id}>
                        {meal.title}: UGX {meal.price}
                      </li>
                    ))}
                  </td>
                  <td>{order.cost}</td>
                  <td>{moment(order.createdAt).fromNow()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Loader>
      </div>
    );
  }
}

OrdersHistoryPage.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cost: PropTypes.number.isRequired,
      orderCount: PropTypes.number.isRequired,
      expiresAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      meals: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      customer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  getOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders
});

export default connect(mapStateToProps, { getOrders })(OrdersHistoryPage);
