import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import Logo from "../../images/momably.png";

class TopNav extends Component {
  onLogOutClick = e => {
    e.preventDefault();

    const { firebase, history } = this.props;

    firebase.logout().then(() => history.push("/"));
  };
  render() {
    const {
      props: { auth }
    } = this;

    return (
      <nav className="top-nav navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to={process.env.PUBLIC_URL + "/"} className="navbar-brand">
          <img
            className="header-logo"
            src={Logo}
            width="140px"
            alt="momably logo"
          />
        </NavLink>

        {auth.uid ? (
          <Fragment>
            <ul className="nav ml-auto">
              {/* <li className="nav-item">
                <NavLink
                  exact={true}
                  activeClassName="is-active"
                  className="nav-link"
                  to="/"
                >
                  Home
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink
                  exact={true}
                  activeClassName="is-active"
                  className="nav-link"
                  to={process.env.PUBLIC_URL + "/marketplace"}
                >
                  Marketplace
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact={true}
                  activeClassName="is-active"
                  className="nav-link"
                  to={process.env.PUBLIC_URL + `/edit/${auth.uid}`}
                >
                  Edit Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact={true}
                  activeClassName="is-active"
                  className="nav-link"
                  to={process.env.PUBLIC_URL + `/profile/${auth.uid}`}
                >
                  View Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <a href="#!" className="nav-link" onClick={this.onLogOutClick}>
                  Log Out
                </a>
              </li>
              <li className="nav-item">
                <NavLink
                  exact={true}
                  activeClassName="is-active"
                  className="nav-link"
                  to={process.env.PUBLIC_URL + "/contact"}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </Fragment>
        ) : (
          <ul className="nav ml-auto">
            <li className="nav-item">
              <NavLink
                exact={true}
                activeClassName="is-active"
                className="nav-link"
                to={process.env.PUBLIC_URL + "/"}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact={true}
                activeClassName="is-active"
                className="nav-link"
                to={process.env.PUBLIC_URL + "/marketplace"}
              >
                Marketplace
              </NavLink>
            </li>
            <li className="nav-item signupClass">
              <NavLink
                exact={true}
                activeClassName="is-active"
                className="nav-link"
                to={process.env.PUBLIC_URL + "/signup"}
              >
                Join Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact={true}
                activeClassName="is-active"
                className="nav-link"
                to={process.env.PUBLIC_URL + "/login"}
              >
                Log In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact={true}
                activeClassName="is-active"
                className="nav-link"
                to={process.env.PUBLIC_URL + "/contact"}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
      //   <li className="nav-item">
      //   <a className="nav-link" href="/">
      //     <i className="fas fa-user-circle" />
      //   </a>
      // </li>
    );
  }
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(TopNav);
