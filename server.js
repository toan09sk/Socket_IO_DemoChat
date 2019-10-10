var express = require('express');
var app = express();
app.use(express.static("public")); // localhost:3000/teo.png

app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUsers = [];

io.on("connection", (socket) => {
    console.log("Co nguoi ket noi" + socket.id);

    socket.on("client-send-Username", (data) => {
        if (mangUsers.indexOf(data) >= 0) {
            // Dang ki that bai
            socket.emit("client-send-dki-thatbai");
        } else {
            // Dang ki thanh cong
            mangUsers.push(data);
            socket.Username = data;
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-danhsach-Users", mangUsers);
        }
    });

    socket.on("logout", () => {
        mangUsers.splice(
            mangUsers.indexOf(socket.Username), 1
        );
        socket.broadcast.emit("server-send-danhsach-Users", mangUsers);
    });

    socket.on("user-send-message", (data) => {
        io.sockets.emit("server-send-message", { un: socket.Username, nd: data });
    });

    socket.on("toi-dang-go-chu", () => {
        var s = socket.Username + " dang go chu";
        io.sockets.emit("ai-do-dang-go-chu", s);
    });

    socket.on("toi-stop-go-chu", () => {
        var s = socket.Username + " Stop go chu";
        io.sockets.emit("ai-do-STOP-go-chu", s);
    });
});

app.get("/", (req, res) => {
    res.render("trangchu");
});