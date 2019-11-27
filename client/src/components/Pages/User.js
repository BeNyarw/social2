import React, { Component } from "react";
import Post from "../Post/Post.js";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chat from "../layouts/Chat.js";
import Connected from "../layouts/Connected.js";
import axios from "axios";


class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      user : this.props.match.params.pseudo,
      post : [],
      currentAdding : ''
    }
    this.settingState = this.settingState.bind(this)
  }
  settingState(){
    axios.get('/api/post/user/'+this.state.user)
      .then(res => {
        this.setState({
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

        <Paper className="panel-dashboard" id="description"><h2>{this.state.user}</h2> <p>Description</p></Paper>
        <div className="panel-dashboard" id="post-of-user">
            {

              this.state.post.map((post,i)=>{
              return(
                <Post className="post-dashboard" key={i} rerender={this.settingState} user={post.pseudo} id={post._id} content={post.content} comment={post.comment} />
              )
            })}
        </div>
        <div className="panel-dashboard" id="other">
          <Paper  className="mini-block" id="friend">
            {"Les ami(es) de " + this.state.user + " : "}
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
}export default User;
