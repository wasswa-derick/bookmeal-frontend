import React from "react";
import { connect } from "react-redux";
import $ from "jquery";
import Loader from "react-loader";
import PropTypes from "prop-types";
import { setMessage } from "../../actions/message";
import coffee from "../../assets/images/coffee.jpg";
import { Footer } from "../common";
import { getTodayMenus } from "../../actions/menus";

/**
 * @export
 * @class Home
 * @extends {React.Component}
 */
export class Home extends React.Component {
  state = {
    loaded: false
  };
  componentDidMount = () => {
    this.props
      .getTodayMenus()
      .then(() => this.setState({ loaded: true }))
      .catch(() => {});
  };

  /**
   * @param {Event} evt
   * @param {Number} id
   * @return {null} null
   * @memberof Home
   */
  viewMeals = (evt, id) => {
    if (!this.props.isUserAuthenticated) {
      this.props.setMessage({
        text: "Login or create account to view and order meals on this menu",
        show: true
      });
      $(".modal-backdrop").remove();
      this.props.history.push("/login");
    }
    $(".modal-backdrop").remove();
    this.props.history.push(`/menu/${id}/order`);
  };

  /**
   * @returns {object} rendered elements
   * @memberof Home
   */
  render() {
    const { menus } = this.props;
    const { loaded } = this.state;

    return (
      <div>
        <div className="header-copy">
          <div className="header-text">
            <h1>Enjoy Food from </h1>
            <span>your Favorite Restaurants</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4> Menus from your favorite restaurants</h4>
            </div>
          </div>

          <hr />
          <div className="row bookings">
            <div className="col-md-12">
              <Loader loaded={loaded}>
                {menus.length === 0 ? (
                  <div style={{ textAlign: "center" }}>
                    <h4>
                      Ooops. There are no menus from caterers to show today
                    </h4>
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
                            style={{ width: "16rem", padding: "10px" }}
                          >
                            <img
                              className="img img-thumbnail"
                              src={menu.imageURL ? menu.imageURL : coffee}
                              alt=""
                              style={{ height: "180px", width: "100%" }}
                            />
                            <div className="card-body">
                              <h6 className="card-title">{menu.title}</h6>
                              <p
                                style={{ color: "gray" }}
                                className="card-text"
                              >
                                <i>{menu.description}</i>
                              </p>
                            </div>
                            <div>
                              <p>By: {menu.catering.name}</p>
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
          <hr />
          <div className="center-site">
            <h4>
              Use our service to order food online and we shall make the
              delivery in a matter of minutes!
            </h4>
            <p>With this site keeping in touch is alot easier and faster.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
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
})(Home);
