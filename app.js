const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set up EJS templating
app.set("view engine", "ejs");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Handle Socket.IO connections
io.on("connection", (socket) => {
  // Handle send-location event
  socket.on("send-location", (data) => {
    // Broadcast location data to all connected clients
    io.emit("receive-location", { id: socket.id, ...data });
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    // Broadcast user disconnection to all connected clients
    io.emit("user-disconnect", socket.id);
  });
});

// Handle GET request to root URL
app.get("/", (req, res) => {
  // Render index.ejs template
  res.render("index.ejs");
});

// Start server on port 3000
server.listen(3000, () => {
  console.log("Server is running");
});


