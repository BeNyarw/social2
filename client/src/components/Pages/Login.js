import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../setAuthToken.js"

class Login extends Component {
  constructor(props){
    super(props)
    this.state ={
      email : '',
      password : ''
    }
    this.postData = this.postData.bind(this)
  }
  postData(){
    axios
      .post("/api/users/login", {email : this.state.email,password : this.state.password})
      .then(res => {
      console.log(res)
         const { token } = res.data;
         localStorage.setItem("jwtToken", token);
        setAuthToken(token)
         const decoded = jwt_decode(token);
         this.props.isAuthedCheck(true,decoded.pseudo,decoded.id)
       })
      this.props.history.push("/dashboard")
}

  render() {
    return (
      <div className="login-Wrapper">
      
      <form >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Adresse email"
          type="email"
          fullWidth
          onChange={(e)=>{this.setState({email : e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Mot de passe"
          type="password"
          fullWidth
            onChange={(e)=>{this.setState({password : e.target.value})}}
        />
        <Button variant="outlined" color="primary" onClick={this.postData}>
        Se connecter
      </Button>
      </form>
      </div>
    );
  }
}export default Login;
