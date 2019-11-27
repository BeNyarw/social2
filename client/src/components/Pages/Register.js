import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

class Register extends Component {
  constructor(props){
    super(props)
    this.state ={
      pseudo: '',
      email : '',
      password2 : '',
      password : '',
      lvl : 'user'
    }
    this.postData = this.postData.bind(this)
  }
  postData(){
    let obj =  {pseudo : this.state.pseudo, email : this.state.email,password : this.state.password,password2 : this.state.password2,lvl : 'user'}
    console.log(obj)
    axios
      .post("http://localhost:5000/api/users/register", obj)
      .then(res => {
         this.props.history.push("/login")
       }).catch(err =>{
         console.log(err)
       })
  }

  render() {
    return (
      <div className="login-Wrapper">
      <form>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Pseudo"
          type="text"
          fullWidth
          onChange={(e)=>{this.setState({pseudo : e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email"
          type="email"
          fullWidth
            onChange={(e)=>{this.setState({email : e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Mot de passe"
          type="password"
          fullWidth
            onChange={(e)=>{this.setState({password : e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Mot de passe"
          type="password"
          fullWidth
            onChange={(e)=>{this.setState({password2 : e.target.value})}}
        />
        <Button variant="outlined" color="primary" onClick={this.postData}>
        Se connecter
      </Button>
      </form>
      </div>
    );
  }
}export default Register;
