import React from "react";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

class Chat extends React.Component{
    constructor(props){
        super(props);
        const decoded = jwt_decode(localStorage.jwtToken);

        this.state = {
            username: decoded.pseudo,
            message: '',
            messages: []
        };

       

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        this.sendMessage = e => {
            if(this.state.message !== ''){
              this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
              })
              this.setState({message: ''});
            }

        }
    }
    render(){
      console.log(this.state.messages)
        return (
            <div className="chat-wrapper">
                <div className="messages-chat">
                    <div className="messages">
                        {this.state.messages.map((message,i) => {
                            return (
                                <div key={i}>{message.author}: {message.message}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="input-chat">
                    <TextField type="text" className="text-input-chat" placeholder="Message" value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                    <Button onClick={this.sendMessage} className="send-chat"><SendIcon /></Button >
                </div>
            </div>
        );
    }
}

export default Chat;
