import socket from "../../services/socket.js";
import context from "../../store/context.js";
import { render } from "../../render.js";

export const connect = () => {
    socket.on("connect", () => {
        console.log("Коннект");

        context.isOnline = true;

        render(context);
    });
};

export const disconnect = () => {
    socket.on("disconnect", () => {
        console.log("Дисконнект");

        if (!context.isStart) {
            context.isDisconnected = true;
            context.isReconnecting = false;

            render(context, ["add-user-panel", "send-tasks"]);
            return;
        }

        context.isOnline = false;

        render(context);
    });
};

export const reconnect = (data) => {
    console.log("Сигнал room/rehost отправлен. Данные:");
    console.log(data);

    socket.emit("room/rehost", data);
};
