var socket = io("http://localhost:3000");

socket.on("client-send-dki-thatbai", () => {
    alert(" Sai username (co nguoi da dang ki roi!!!)");
});

socket.on("server-send-dki-thanhcong", (data) => {
    $("#currentUser").html(data);
    $("#loginForm").hide(2000); //2s
    $("#chatForm").show(1000); //s
});

socket.on("server-send-danhsach-Users", (data) => {
    $("#boxContent").html("");
    data.forEach(element => {
        $("#boxContent").append("<div class='user'>" + element + "</div>");
    });
});

socket.on("server-send-message", (data) => {
    $("#listMessages").append("<div class='ms'>" + data.un + ":" + data.nd + "</div>");
});

$(document).ready(() => {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(() => {
        socket.emit("client-send-Username", $("#txtUsername").val());
    });

    $("#btnLogout").click(() => {
        socket.emit("logout");
        $("#loginForm").show(2);
        $("#chatForm").hide(1);
    });

    $("#btnSendMessage").click(() => {
        socket.emit("user-send-message", $("#txtMessage").val());
    });
});