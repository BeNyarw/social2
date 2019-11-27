const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const post = require("./routes/api/post");
const app = express();// Bodyparser middleware
const db = require("./config/key.js").mongoURI;// Connect to MongoDB
const port = process.env.PORT || 5000;
const cors = require('cors')
var socket = require('socket.io');

let userConnected =[];
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());// DB Config

mongoose.connect(db,{ useNewUrlParser: true }).then(
    () => console.log("MongoDB successfully connected")
  ).catch(err => console.log(err));// Passport middleware
  require("./config/passport")(passport);// Routes
app.use(passport.initialize());// Passport config

app.use("/api/users", users);
app.use("/api/post", post);

server = app.listen(port, () => console.log(`Server up and running on port ${port} !`));
io = socket(server);

io.on('connection', (socket) => {
      socket.on('CONNECTED_USER', function(data) {

        userConnected.push({user : data.user, socketId : socket.id})
        console.log(userConnected)
        io.sockets.emit('GET_CONNECTED_USER', { userConnected: userConnected });
      });
      socket.on('disconnect', function() {
         userConnected = userConnected.filter(function(value, index, arr){
          return value.socketId !== socket.id;
        });
        io.sockets.emit('GET_CONNECTED_USER', { userConnected: userConnected });
      });
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});
