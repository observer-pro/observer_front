import socket from "../../services/socket.js";

export const requireAllMessages = (data) => {
    console.log("Отправлен сигнал message/user. Данные:");
    console.log(data);

    socket.emit("message/user", { user_id: data.user_id });
};
