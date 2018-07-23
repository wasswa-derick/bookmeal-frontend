import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader";
import PropTypes from "prop-types";
import moment from "moment";
import CustomerOrderMealModal from "../components/OrderMealModal";
import { getMyOrders, modifyOrder } from "../actions/orders";
import { getMenu } from "../actions/menus";

/**
 * @export
 * @class CustomerOrdersPage
 * @extends {React.Component}
 */
export class CustomerOrdersPage extends React.Component {
  state = {
    order: {
      id: 0,
      menuId: 0,
      meals: [],
      totalCost: 0,
      orderCount: 1,
      cost: 0
    },
    loaded: false,
    selectedMenu: {
      catering: {
        address: "",
        name: ""
      },
      description: "",
      id: 0,
      meals: [],
      title: ""
    }
  };
  componentWillMount = () => {
    this.props
      .getMyOrders()
      .then(() => this.setState({ loaded: true }))
      .catch(() => {});
  };

  /**
   * @param {Event} evt
   * @param {Object} order
   * @returns {null} void
   * @memberof CustomerOrdersPage
   */
  onSelected = (evt, order) => {
    this.setState({ order });
    // get the menu for this order
    this.props
      .getMenu(order.menuId)
      .then(() => this.setState({ selectedMenu: this.props.menu }))
      .catch(() => {});
  };
  /**
   * @param {Object} data
   * @returns {null} void
   * @memberof CustomerOrdersPage
   */
  makeOrder = data => {
    this.props
      .modifyOrder(data.id, {
        orderCount: data.orderCount,
        meals: data.meals.map(meal => meal.id)
      })
      .then(() => window.location.reload())
      .catch(() => {});
  };
  /**
   * @returns {null} renders elements
   * @memberof CustomerOrdersPage
   */
  render() {
    const { loaded } = this.state;
    const { orders } = this.props;
    return (
      <div className="container">
        <div>
          <h4>Your Previous Orders</h4>
          <hr />
        </div>
        <Loader loaded={loaded}>
          <table id="dtable" className="table table-striped">
            <thead>
              <tr role="row">
                <th>Order Count</th>
                <th>Meals Ordered</th>
                <th>Total Cost</th>
                <th>Expires</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="even">
                  <td>{order.orderCount}</td>
                  <td>
                    {order.meals.map(meal => (
                      <li key={meal.id}>
                        {meal.title}: UGX {meal.price}
                      </li>
                    ))}
                  </td>
                  <td>{order.cost}</td>
                  <td>{moment(order.expiresAt).fromNow()}</td>
                  <td>
                    {(moment() - moment(order.expiresAt) <= 0 && (
                      <i
                        aria-hidden
                        style={{ cursor: "pointer" }}
                        onClick={evt => this.onSelected(evt, order)}
                        className="fa fa-edit"
                        data-toggle="modal"
                        data-target="#orderModal"
                      />
                    )) || <p className="text-danger">Expired can not modify</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Loader>
        <CustomerOrderMealModal
          selectedMenu={this.state.selectedMenu}
          order={this.state.order}
          submit={this.makeOrder}
        />
      </div>
    );
  }
}

CustomerOrdersPage.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      menuId: PropTypes.number.isRequired,
      cost: PropTypes.number.isRequired,
      orderCount: PropTypes.number.isRequired,
      expiresAt: PropTypes.string.isRequired,
      meals: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  getMyOrders: PropTypes.func.isRequired,
  getMenu: PropTypes.func.isRequired,
  menu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    meals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  modifyOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders,
  menu: state.menusReducer.menu
});

export default connect(mapStateToProps, { getMyOrders, getMenu, modifyOrder })(
  CustomerOrdersPage
);
