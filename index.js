const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
    console.log(`User connected with ID: ${socket.id}`);

    socket.on('player ready', name => {
        console.log("player ready", name);
        socket.broadcast.emit('player ready', {
            id: socket.id,
            name,
        });
    });

    socket.on('player move', ({ to, from, area }) => {
        console.log("player move to", area, from);
        socket.to(to).emit('player move', {
            from,
            area,
        });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected with ID: ${socket.id}`);
        socket.broadcast.emit('user disconnected', socket.id);
    });
});


server.listen(PORT, function () {
	console.log(' < < >< <>', PORT);
});
