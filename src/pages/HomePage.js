import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import $ from "jquery";
import coffeeImg from "../img/coffee.jpg";
import { getTodayMenus } from "../actions/menus";
import { orderMeals } from "../actions/orders";
import { setMessage } from "../actions/message";
import CustomerOrderMealModal from "../components/OrderMealModal";

/**
 * @export
 * @class HomePage
 * @extends {React.Component}
 */
export class HomePage extends React.Component {
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
      .getTodayMenus()
      .then(() => this.setState({ loaded: true }))
      .catch(() => {});
  };
  /**
   * @param {Event}evt
   * @param {Number} id
   * @return {null} null
   * @memberof HomePage
   */
  viewMeals = (evt, id) => {
    if (!this.props.isUserAuthenticated) {
      this.props.setMessage({
        text: `Login or create account to view and order meals on this menu`,
        type: `warning`
      });
      $(".modal-backdrop").remove();
      this.props.history.push("/login");
    }
    const { menus } = this.props;
    const selectedMenu = menus.find(menu => menu.id === id);
    this.setState({
      selectedMenu,
      order: { ...this.state.order, menuId: selectedMenu.id }
    });
  };
  /**
   * @param {Object} data
   * @returns {null} void
   * @memberof HomePage
   */
  makeOrder = data => {
    this.props.orderMeals(data);
    $(".modal-backdrop").remove();
    this.props.history.push("/order");
  };

  /**
   * @returns {object} rendered elements
   * @memberof HomePage
   */
  render() {
    const { menus } = this.props;
    const { loaded, selectedMenu, order } = this.state;

    return (
      <div>
        <div className="container">
          <h4>Favorite Restaurants</h4>
          <hr />
          <Loader loaded={loaded}>
            {menus.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                <h4>Ooops. There are no menus from caterers today</h4>
              </div>
            ) : (
              <div>
                <div className="row mt-2">
                  {menus.map(menu => (
                    <div
                      style={{ cursor: "pointer" }}
                      key={menu.id}
                      className="col-md-3"
                    >
                      <div
                        onClick={evt => this.viewMeals(evt, menu.id)}
                        aria-hidden
                        className="card"
                        data-toggle="modal"
                        data-target="#orderModal"
                        style={{ width: "18rem" }}
                      >
                        <img
                          className="card-img-top"
                          src={coffeeImg}
                          alt="menu-img"
                        />
                        <div className="card-body">
                          <h6 className="card-title">{menu.title}</h6>
                          <p style={{ color: "gray" }} className="card-text">
                            {menu.description}
                          </p>
                        </div>
                        {/* <div className="card-footer">
                      <p>BY: {menu.catering.name}</p>
                    </div> */}
                      </div>
                    </div>
                  ))}
                </div>
                <CustomerOrderMealModal
                  order={order}
                  selectedMenu={selectedMenu}
                  submit={this.makeOrder}
                />
              </div>
            )}
          </Loader>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  getTodayMenus: PropTypes.func.isRequired,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      menuDate: PropTypes.string.isRequired,
      meals: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  orderMeals: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  setMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  menus: state.menusReducer.menus,
  isUserAuthenticated: !!state.authReducer.user.isLoggedIn
});

export default connect(mapStateToProps, {
  getTodayMenus,
  orderMeals,
  setMessage
})(HomePage);
