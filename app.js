const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);
  socket.on("md", function (point) {
    socket.broadcast.emit("onmousedown", point);
  });

  socket.on("mm", function (point) {
    socket.broadcast.emit("onmousemove", point);
  });

  socket.on("redraw", (points) => {
    console.log("redraw called");
    socket.broadcast.emit("redraw", points);
  });
});

http.listen(3000, function () {
  console.log("Server started at port 3000 !");
});
