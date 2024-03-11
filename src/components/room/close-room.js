import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

const newUrl = new URL(window.location.href);

const closeRoom = (data) => {
    socket.emit("room/close", data);
    console.log("Сигнал room/close отправлен. Данные:");
    console.log(data);
};

export const handleCloseRoom = () => {
    const closeElement = document.getElementById("quit");

    closeElement?.addEventListener("click", (event) => {
        event.preventDefault();

        store.is_first_loading = true;

        context.isClosed = true;
        context.isStart = true;
        context.currentAddress = store.server;
        context.isSent = false;
        context.taskNumber = 1;

        localStorage.removeItem("ROOM_ID");
        localStorage.removeItem("HOST_ID");
        localStorage.removeItem("TASK_NUMBER");

        renderApp(context);
        closeRoom({ room_id: store.room_id });

        window.history.pushState({}, document.title, newUrl.origin);
    });
};
