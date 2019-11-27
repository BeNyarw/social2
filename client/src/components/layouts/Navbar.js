import React, { Component } from "react";


import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="navbar">
        <nav className="nav-wraper">
            <Link
              to={this.props.isAuthed ? "/dashboard" : "/"}
              className="homepage-Link"
            >
              <h1>Discover</h1>
            </Link>
            {!this.props.isAuthed ?
            (
              <div className="disconnected-link">
              <Link
              to="/Login"
              className="login-link"
              >
              <p>Se connecter</p>
              </Link>
              <Link
              to="/Register"
              className="register-Link"
              >
              <p>S'inscrire</p>
              </Link>
              </div>
            )
              :
              (
                <div className="connected-link">
                <Link
              to="/feed"
              className="discover-Link"
              >
                <p>Decouvrir</p>
              </Link>
              <p><a onClick={this.props.logout} className="logout-Link" href="/">Se déconnecter</a></p>
              </div>
            )
            }


        </nav>
      </div>
    );
  }
}export default Navbar;
