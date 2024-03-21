import socket from "../../services/socket.js";
import context from "../../store/context.js";

export const createRoom = () => {
    context.isStart = false;
    context.isClosed = false;
    context.taskNumber = 1;

    localStorage.removeItem("TASK_NUMBER");
    socket.emit("room/create", { name: "Host" });
    console.log(`Отправлен сигнал room/create. Пользователь: Host`);
};
