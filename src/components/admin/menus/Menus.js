import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "react-loader";
import PropTypes from "prop-types";
import $ from "jquery";
import { getMenus, deleteMenu } from "../../../actions/menus";
import coffee from "../../../assets/images/coffee.jpg";
import DeleteModal from "../deleteModal/DeleteModal";

/**
 * @export
 * @class Menus
 * @extends {React.Component}
 */
export class Menus extends React.Component {
  state = { loaded: false, menuId: 0 };
  componentWillMount = () =>
    this.props.getMenus().then(() => this.setState({ loaded: true }));

  /**
   *@param {number} id
   *@return {null} null
   */
  setDeletionId = id => this.setState({ menuId: id });

  /**
   *@param {Event}evt
   *@param {Number} id
   *@returns {null}null
   *@memberof Menus
   */
  delete = () => {
    const { menuId } = this.state;
    this.props.deleteMenu(menuId).then(() => {
      this.setState({ menuId: 0 });
      this.props.getMenus();
      $("#btn-no").click();
    });
  };

  /**
   *
   *
   * @returns {null} elements to render
   * @memberof Menus
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
                  <th>Picture</th>
                  <th>Meals</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {menus.map(menu => (
                  <tr key={menu.id} className="even">
                    <td>{menu.menuDate}</td>
                    <td>
                      <img
                        style={{
                          height: "100px",
                          width: "150px"
                        }}
                        className="img img-thumbnail"
                        src={menu.imageURL ? menu.imageURL : coffee}
                        alt=""
                      />
                    </td>
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
                    <td>
                      <Link
                        href={`/admin/menus/${menu.id}/edit`}
                        to={`/admin/menus/${menu.id}/edit`}
                      >
                        <i className="fa fa-edit" />
                      </Link>
                      <a
                        id="btn-delete"
                        style={{ marginLeft: "10px" }}
                        href="#delete"
                        role="button"
                        data-toggle="modal"
                        data-target="#confirmDel"
                        onClick={() => this.setDeletionId(menu.id)}
                      >
                        <i className="fa fa-trash text-danger" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Loader>
          <DeleteModal title="menu" confirmDeletion={this.delete} />
        </section>
      </div>
    );
  }
}

Menus.propTypes = {
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
  ).isRequired,
  deleteMenu: PropTypes.func.isRequired
};

const mapSateToProps = state => ({
  menus: state.menusReducer.menus
});

export default connect(mapSateToProps, { getMenus, deleteMenu })(Menus);
