const express = require("express");
const http = require("http");  // it is used for socket
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname,  "public")));

app.get("/", function (req,res){
res.send("hey")
})

server.listen(3000,()=>{
    console.log("Server is running");
})