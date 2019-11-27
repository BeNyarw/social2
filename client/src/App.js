import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import Homepage from "./components/Pages/Homepage";
import Dashboard from "./components/Pages/Dashboard";
import User from "./components/Pages/User";
import Feed from "./components/Pages/Feed";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import setAuthToken from "./setAuthToken.js";
import "./App.css";

const NoMatchPage = () => {  return (    <h3>404 - Not found</h3>  );};

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      authenticated : false,
      user : '',
      token : ''
    }
    this.isAuth = this.isAuth.bind(this)
  }
  isAuth(auth,user,token){
    this.setState({
      authenticated : true,
      user : user,
      token : token
    })
  }
  logout(){
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    this.isAuth(false,"","")
  }
  componentDidMount(){
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      setAuthToken(localStorage.jwtToken);
      this.isAuth(true,decoded.pseudo,decoded.id)
    }
  }
  render() {
    return (
        <Router>
          <div className="App">
            <Navbar logout={this.logout} isAuthed={this.state.authenticated} />
            <Switch>
              <Route restricted={true} exact path="/" component={Homepage} />
              <Route restricted={true} exact path="/register" isAuthed={this.state.authenticated} component={Register} />
              <Route restricted={true} isAuthedCheck={this.isAuth}  isAuthed={this.state.authenticated} exact path="/login" component={Login} />

              <Route  user={this.state.user} isAuthed={this.state.authenticated} exact path="/feed" component={Feed} />

              <Route  user={this.state.user} isAuthed={this.state.authenticated} exact path="/user/:pseudo" component={User} />

              <Route isAuthedCheck={this.isAuth} user={this.state.user} isAuthed={this.state.authenticated} exact path="/dashboard" component={Dashboard} />

              <Route component={NoMatchPage} />
             </Switch>
          </div>
        </Router>
    );
  }
}export default App;
