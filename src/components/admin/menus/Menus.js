import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "react-loader";
import PropTypes from "prop-types";
import { getMenus } from "../../../actions/menus";

/**

 * @export
 * @class MenusPage
 * @extends {React.Component}
 */
export class MenusPage extends React.Component {
  state = {
    loaded: false
  };
  componentWillMount = () =>
    this.props
      .getMenus()
      .then(() => this.setState({ loaded: true }))
      .catch(() => {});

  /**
   *
   *
   * @returns {null} elements to render
   * @memberof MenusPage
   */
  render() {
    const { menus } = this.props;
    const { loaded } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="stat">
              <h2>
                {menus.length} <i className="fa fa-bars" />
              </h2>
              <label htmlFor="menus">Menus</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stat">
              <Link
                to="/admin/menus/new"
                href="/admin/menus/new"
                className="btn btn-primary"
              >
                Set New Menu
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <section>
          <h4>Available Menus</h4>
          <hr />
          <Loader loaded={loaded}>
            <table id="dtable" className="table table-striped">
              <thead>
                <tr role="row">
                  <th>Menu Date</th>
                  <th>Meals</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {menus.map(menu => (
                  <tr key={menu.id} className="even">
                    <td>{menu.menuDate}</td>
                    <td>
                      {menu.meals.map(meal => (
                        <li key={meal.id}>
                          {meal.title}:{" "}
                          <span style={{ color: "#00a1e0" }}>
                            UGX {meal.price}
                          </span>
                        </li>
                      ))}
                    </td>
                    <td>{menu.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Loader>
        </section>
      </div>
    );
  }
}

MenusPage.propTypes = {
  getMenus: PropTypes.func.isRequired,
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
  ).isRequired
};

const mapSateToProps = state => ({
  menus: state.menusReducer.menus
});

export default connect(mapSateToProps, { getMenus })(MenusPage);
