import React from "react";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

class Connected extends React.Component{
    constructor(props){
        super(props);
        const decoded = jwt_decode(localStorage.jwtToken);

        this.state = {
            connected: []
        };

        this.socket = io('belkacemsocial.yj.fr');

        this.socket.emit('CONNECTED_USER', {
          user: decoded.pseudo,
        })

        this.socket.on('GET_CONNECTED_USER', function(data){
            addConnectedUser(data);
        });

        const addConnectedUser = data => {
          console.log(data)
            this.setState({connected: [...data.userConnected]});
        };
    }
    render(){
        return (
            <div className="connected-wrapper">
              {this.state.connected.map((user,i) => {
                console.log(user)
                  return (
                      <div key={i}><a href={"/user/"+user.user}>{user.user}</a></div>
                  )
              })}
            </div>
        );
    }
}

export default Connected;
