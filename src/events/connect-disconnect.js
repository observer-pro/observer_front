import socket from "../components/socket.js";
import { context, appElement } from "../main.js";
import { renderApp } from "../render.js";

const reconnect = (data) => {
    console.log("Запрос room/rehost отправлен. Отправлены данные:");
    console.log(data);

    socket.emit("room/rehost", data);
};

export const getStatus = (set) => {
    socket.on("log", (log) => {
        socket.on("connect", () => {
            console.log("Коннект");

            set(true, log);
        });
        socket.on("disconnect", () => {
            set(false, log);
        });
    });
};
export const disconnect = (set) => {
    socket.on("disconnect", () => {
        console.log("Дисконнект");

        set(true);
    });
};
export const initReconnecting = () => {
    const rehostElement = document.querySelector("#rehost");

    rehostElement?.addEventListener("click", (event) => {
        event.preventDefault();

        context.isReconnecting = true;

        renderApp(appElement, context);
        reconnect({
            user_id: context.room.users[0].id,
            room_id: context.room.id,
        });
    });
};
