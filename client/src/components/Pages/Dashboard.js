import React, { Component } from "react";
import Post from "../Post/Post.js";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chat from "../layouts/Chat.js";
import Connected from "../layouts/Connected.js";
import axios from "axios";
import jwt_decode from "jwt-decode";
const decoded='';


class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      user : decoded.pseudo,
      post : [],
      currentAdding : ''
    }
    this.settingState = this.settingState.bind(this)
    this.addPost = this.addPost.bind(this)
  }
  addPost(){
    console.log(this.state)
    axios.post('/api/post/add/', {pseudo : this.state.user,content : this.state.currentAdding})
      .then(res => {
          document.getElementById('currentAdding').value = '';
          this.settingState()
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  settingState(){
    const decoded = jwt_decode(localStorage.jwtToken);

    axios.get('/api/post/user/'+decoded.pseudo)
      .then(res => {
        this.setState({
          user : decoded.pseudo,
          post : res.data
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  componentDidMount() {
    this.settingState()
  }
  render() {
    return (
      <div id="content-dashboard">
      <Paper className="panel-dashboard" id="description"><h2>{this.state.user}</h2>
                <TextField
                  autoFocus
                  multiline
                  margin="dense"
                  id="currentAdding"
                  label="Description"
                  type="text"
                  fullWidth

                />
                </Paper>
        <div className="panel-dashboard" id="post-of-user">
        <h4>Créer un nouveau post</h4>
          <Paper className ="addPost">
            <TextField
              autoFocus
              multiline
              margin="dense"
              id="currentAdding"
              label="Nouveau post"
              type="text"
              fullWidth
              onChange={(e)=>{this.setState({currentAdding : e.target.value})}}
            />
          <Button variant="outlined" color="primary" onClick={this.addPost}>
            Poster
          </Button>

          </Paper >

            {

              this.state.post.map((post,i)=>{
              return(
                <Post className="post-dashboard" key={i} rerender={this.settingState} user={post.pseudo} id={post._id} content={post.content} comment={post.comment} />
              )
            })}
        </div>
        <div className="panel-dashboard" id="other">
          <Paper  className="mini-block" id="friend">
            Vos Ami(es) :
          </Paper>
          <Paper className="mini-block"  id="connected">
            Les membres connectés
            <Connected />
          </Paper>
          <Paper  className="mini-block" id="chat">
            <Chat />
          </Paper>
        </div>
      </div>
    );
  }
}export default Dashboard;
