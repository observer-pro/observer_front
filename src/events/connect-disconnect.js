import socket from "../components/socket.js";
import { context, appElement } from "../main.js";
import { renderApp } from "../render.js";

const reconnect = (data) => {
    console.log("Запрос room/rehost отправлен. Отправлены данные:");
    console.log(data);

    socket.emit("room/rehost", data);
};

export const connect = (set) => {
    socket.on("connect", () => {
        console.log("Коннект");

        set(true);
    });
};
export const disconnect = (set) => {
    socket.on("disconnect", () => {
        console.log("Дисконнект");

        set(false);
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

        setTimeout(() => {
            if (context.isDisconnected) {
                context.isReconnecting = false;

                renderApp(appElement, context);
            }
        }, 3000);
    });
};
export const initCheckAddress = () => {
    const addressElement = document.querySelector("#address");

    addressElement.value = window.localStorage.getItem("SERVER");

    addressElement.addEventListener("input", (event) => {
        window.localStorage.setItem("SERVER", event.target.value);
    });
};
