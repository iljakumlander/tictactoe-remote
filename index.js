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
    socket.on('player ready', ({ id, name, remote }) => {
        socket.broadcast.emit('player ready', {
            id: socket.id,
            name,
            remote,
        });
    });

    socket.on('player accept', ({ id, name, remote }) => {
        socket.to(remote).emit('player accepted', {
            id: id,
            name,
            remote,
        });

        socket.to(id).emit('player accepted', {
            id: id,
            name,
            remote,
        });
    });

    socket.on('player move', ({ to, from, area }) => {
        socket.to(to).emit('player move', {
            from,
            area,
        });
    });

    socket.on('new game', ({ to, from, datetime }) => {
        socket.to(to).emit('new game', {
            from,
            datetime: datetime,
        });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit('user disconnected', socket.id);
    });
});


server.listen(PORT, function () {
	console.log(' < < >< <>', PORT);
});
