import socket from "../../services/socket.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

export const connect = () => {
    socket.on("connect", () => {
        context.isOnline = true;

        renderApp(context);
        console.log("Коннект");
    });
};

export const disconnect = () => {
    socket.on("disconnect", () => {
        console.log("Дисконнект");

        if (!context.isStart) {
            context.isDisconnected = true;
            context.isReconnecting = false;

            renderApp(context, ["update-user-panel"]);
            return;
        }

        context.isOnline = false;

        renderApp(context);
    });
};

export const reconnect = (data) => {
    socket.emit("room/rehost", data);
    console.log("Сигнал room/rehost отправлен. Данные:");
    console.log(data);
};
