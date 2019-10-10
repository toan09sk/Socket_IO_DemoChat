var socket = io("http://localhost:3000");

socket.on("client-send-dki-thatbai", () => {
    alert(" Sai username (co nguoi da dang ki roi!!!)");
});

socket.on("server-send-dki-thanhcong", (data) => {
    $("#currentUser").html(data);
    $("#loginForm").hide(2); //2s
    $("#chatForm").show(1); //s
});

$(document).ready(() => {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(() => {
        socket.emit("client-send-Username", $("#txtUsername").val());
    });
});