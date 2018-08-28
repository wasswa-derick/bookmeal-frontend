import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader";
import PropTypes from "prop-types";
import moment from "moment";
import { OrderMealModal } from "../../components/common";
import { getMyOrders, modifyOrder } from "../../actions/orders";
import { setMessage } from "../../actions/message";
import { getMenu } from "../../actions/menus";

/**
 * @export
 * @class CustomerOrders
 * @extends {React.Component}
 */
export class CustomerOrders extends React.Component {
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
    this.props.getMyOrders().then(() => this.setState({ loaded: true }));
  };

  /**
   * @param {Event} evt
   * @param {Object} order
   * @returns {null} void
   * @memberof CustomerOrders
   */
  onSelected = (evt, order) => {
    this.setState({ order });
    // get the menu for this order
    this.props
      .getMenu(order.menuId)
      .then(() => this.setState({ selectedMenu: this.props.menu }));
  };
  /**
   * @param {Object} data
   * @returns {null} void
   * @memberof CustomerOrders
   */
  makeOrder = data => {
    this.props
      .modifyOrder(data.id, {
        orderCount: data.orderCount,
        meals: data.meals.map(meal => meal.id)
      })
      .then(() => {
        this.props.setMessage({
          text: "Order has been placed successfully",
          show: true
        });
        this.props.getMyOrders();
      });
  };
  /**
   * @returns {null} renders elements
   * @memberof CustomerOrders
   */
  render() {
    const { loaded, order } = this.state;
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
              {orders.map(myOrder => (
                <tr key={myOrder.id} className="even">
                  <td>{myOrder.orderCount}</td>
                  <td>
                    {myOrder.meals.map(meal => (
                      <li key={meal.id}>
                        {meal.title}: UGX {meal.price}
                      </li>
                    ))}
                  </td>
                  <td>UGX {myOrder.cost}</td>
                  <td>{moment(myOrder.expiresAt).fromNow()}</td>
                  <td>
                    {(moment() - moment(myOrder.expiresAt) <= 0 && (
                      <i
                        aria-hidden
                        style={{ cursor: "pointer" }}
                        onClick={evt => this.onSelected(evt, myOrder)}
                        className="fa fa-edit"
                        data-toggle="modal"
                        data-target="#orderModal"
                      />
                    )) || <p className="text-danger">Order has expired</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Loader>
        <OrderMealModal
          selectedMenu={this.state.selectedMenu}
          order={order}
          submit={this.makeOrder}
        />
      </div>
    );
  }
}

CustomerOrders.propTypes = {
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
  modifyOrder: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders,
  menu: state.menusReducer.menu
});

export default connect(mapStateToProps, {
  getMyOrders,
  getMenu,
  modifyOrder,
  setMessage
})(CustomerOrders);
