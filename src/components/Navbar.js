import React, { useState, Fragment, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

function Nav({ logout, isAuthenticated, user }) {
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    setRedirect(true);
    logout();
  };

  

  const guestLinks = () => (
    <Fragment>
      <ReactBootStrap.Navbar bg="light" expand="lg" style={{ width: "100%" }}>
        <div className="icons">
          <ReactBootStrap.Nav.Item>
            <ReactBootStrap.Nav.Link
              href="/login"
              style={{ color: "black", textDecoration: "none" }}
            >
              sign in
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav.Item>
          <ReactBootStrap.Nav.Item>
            <ReactBootStrap.Nav.Link
              href="/signup"
              style={{ color: "black", textDecoration: "none" }}
            >
              sign up
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav.Item>
        </div>
      </ReactBootStrap.Navbar>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      <ReactBootStrap.Navbar bg="light" expand="lg" style={{ width: "100%" }}>
        <div className="icons">
          <ReactBootStrap.Nav.Item>
            <ReactBootStrap.Nav.Link
              href="/class"
              style={{ color: "black", textDecoration: "none" }}
            >
              Home
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav.Item>
          <ReactBootStrap.Nav.Item>
            <ReactBootStrap.Nav.Link
              onClick={logout_user}
              style={{ color: "black", textDecoration: "none" }}
            >
              Logout
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav.Item>
          <ReactBootStrap.Nav.Item>
            <ReactBootStrap.Nav.Link
              style={{ color: "black", textDecoration: "none" }}
            >
              Welcome-{user.username}
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav.Item>
        </div>
      </ReactBootStrap.Navbar>
    </Fragment>
  );

  return (
    <Fragment>
      <div>
        <ReactBootStrap.Nav>
          {isAuthenticated && user ? authLinks() : guestLinks()}
        </ReactBootStrap.Nav>
        {redirect ? <Redirect to="/login" /> : <Fragment></Fragment>}
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Nav);
