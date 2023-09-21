import socket from "../components/socket.js";
import { context, appElement, codeElement } from "../main.js";
import { renderApp } from "../render.js";
import hljs from "../components/hljs.js";

export const getSignal = () => {
    socket.on("signal", (data) => {
        console.log("Выполнен запрос signal. Получены данные:");
        console.log(data);

        context.room.users.map((user) => {
            if (user.id === data.user_id) {
                user.signal = data.value;
            }
        });
        renderApp(appElement, context);

        if (context.code) {
            hljs.highlightAll(codeElement);
        }
    });
};
