import socket from "../components/socket.js";
import { context, appElement, codeElement } from "../main.js";
import { renderApp } from "../render.js";
import hljs from "../components/hljs.js";

export const getStepsStatus = () => {
    socket.on("steps/status", (data) => {
        console.log("Выполнен запрос steps/status. Получены данные:");
        console.log(data);

        context.room.users.forEach((user) => {
            if (user.id === data.user_id) {
                context.currentSteps = Object.values(data.steps);
            }
        });

        renderApp(appElement, context);

        if (context.code) {
            hljs.highlightAll(codeElement);
        }
    });
};
