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


class Feed extends Component {
  constructor(props){
    super(props)
    this.state = {
      user : decoded.pseudo,
      post : [],
      currentAdding : ''
    }
    this.settingState = this.settingState.bind(this)
  }
  settingState(){
    const decoded = jwt_decode(localStorage.jwtToken);

    axios.get('/api/post/')
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
      <div id="content-feed">
        <Paper className="panel-feed" id="description" />
        <div className="panel-feed" id="post-of-user">
            {

              this.state.post.map((post,i)=>{
              return(
                <Post className="post-dashboard" key={i} rerender={this.settingState} user={post.pseudo} id={post._id} content={post.content} comment={post.comment} />
              )
            })}
        </div>
      </div>
    );
  }
}export default Feed;
