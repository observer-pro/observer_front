import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

const newUrl = new URL(window.location.href);

export const closeRoom = (event) => {
    event.preventDefault();

    const data = { room_id: store.room_id };

    store.is_first_loading = true;

    for (let key in store.tasks) {
        store.tasks[key] = "";
    }

    context.isClosed = true;
    context.isStart = true;
    context.currentAddress = store.server;
    context.isSent = false;
    context.taskNumber = 1;

    localStorage.removeItem("ROOM_ID");
    localStorage.removeItem("HOST_ID");

    renderApp(context);

    window.history.pushState({}, document.title, newUrl.origin);

    socket.emit("room/close", data);
    console.log("Сигнал room/close отправлен. Данные:");
    console.log(data);
};
