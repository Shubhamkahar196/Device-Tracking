const express = require("express");
const http = require("http");  // it is used for socket
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const path = require("path");
const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname,  "public")));

io.on("connection", function(socket){
    console.log("connected");
})

app.get("/", function (req,res){
res.render("index.ejs")
})

server.listen(3000,()=>{
    console.log("Server is running");
})