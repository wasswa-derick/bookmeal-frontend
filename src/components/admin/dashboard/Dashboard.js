import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader";
import moment from "moment";
import PropTypes from "prop-types";

import { getOrders } from "../../../actions/orders";

/**
 * @export
 * @class DashboardPage
 * @extends {React.Component}
 */
export class Dashboard extends React.Component {
  state = {
    loaded: false,
    total: 0
  };
  componentWillMount = () => {
    this.props
      .getOrders()
      .then(() => {
        this.setState({ loaded: true });
        let total = 0;
        this.props.orders.forEach(order => {
          total += order.cost;
        });

        this.setState({ total });
      })
      .catch(() => {});
  };

  componentDidMount = () => {};

  /**
   * @returns {any} elements
   */
  render() {
    const { loaded, total } = this.state;
    const { orders } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="stat">
                <h2>
                  {total}
                  <i> /=</i>
                </h2>
                <label htmlFor="today_cash">Todays Cash</label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stat">
                <h2>
                  {orders.length} <i className="fa fa-sort" />
                </h2>
                <label htmlFor="orders">Orders</label>
              </div>
            </div>
          </div>
          <div>
            <hr />
            <h4>Today Orders</h4>
            <hr />
            <Loader loaded={loaded}>
              <table id="dtable" className="table table-striped">
                <thead>
                  <tr role="row">
                    <th>Customer Name</th>
                    <th>Customer Contact</th>
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
                      <td>
                        {order.meals.map(meal => (
                          <li key={meal.id}>
                            {meal.title}: UGX {meal.price}
                          </li>
                        ))}
                      </td>
                      <td>UGX {order.cost}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Loader>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cost: PropTypes.number.isRequired,
      expiresAt: PropTypes.string.isRequired,
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
      })
    })
  ).isRequired,
  getOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders
});

export default connect(mapStateToProps, { getOrders })(Dashboard);
