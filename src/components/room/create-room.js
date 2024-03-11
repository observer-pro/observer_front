import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";

const createRoom = (name) => {
    socket.emit("room/create", { name });
    console.log(`Отправлен сигнал room/create. Пользователь: ${name}`);
};

export const handleCreateRoom = () => {
    const createElement = document.getElementById("create-room");

    createElement.addEventListener("click", () => {
        context.isStart = false;
        context.isClosed = false;
        context.taskNumber = 1;

        localStorage.removeItem("TASK_NUMBER");

        createRoom(store.host_name);
    });
};
