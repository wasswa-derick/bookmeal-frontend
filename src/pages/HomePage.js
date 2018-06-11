import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import $ from "jquery";
import { getTodayMenus } from "../actions/menus";
import { setMessage } from "../actions/message";

/**
 * @export
 * @class HomePage
 * @extends {React.Component}
 */
export class HomePage extends React.Component {
  state = {
    loaded: false
  };
  componentWillMount = () => {
    this.props
      .getTodayMenus()
      .then(() => this.setState({ loaded: true }))
      .catch(() => {});
  };
  /**
   * @param {Event} evt
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
    $(".modal-backdrop").remove();
    this.props.history.push(`/menu/${id}/order`);
  };

  /**
   * @returns {object} rendered elements
   * @memberof HomePage
   */
  render() {
    const { menus } = this.props;
    const { loaded } = this.state;

    return (
      <div>
        <div className="container">
          <h4>Favorite Restaurants</h4>
          <hr />
          <Loader loaded={loaded}>
            {menus.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                <h4>Ooops. There are no menus from caterers to show today</h4>
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
                        style={{ width: "16rem" }}
                      >
                        <img
                          className="card-img-top"
                          src={menu.url}
                          alt="menu-img"
                        />
                        <div className="card-body">
                          <h6 className="card-title">{menu.title}</h6>
                          <p style={{ color: "gray" }} className="card-text">
                            {menu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
      url: PropTypes.string,
      meals: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
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
  setMessage
})(HomePage);
