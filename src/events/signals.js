import socket from "../components/socket.js";
import { context, appElement, codeElement } from "../main.js";
import { renderApp } from "../render.js";
import hljs from "../components/hljs.js";
import { user_storeage } from "../components/user-storeage.js";

export const getStepsStatus = () => {
    socket.on("steps/status", (data) => {
        console.log("Выполнен запрос steps/status. Получены данные:");
        console.log(data);

        context.room.users.forEach((user) => {
            if (user.id === data.user_id) {
                user_storeage[user.id].steps = Object.values(data.steps);
            }
        });

        if (context.activeUserId) {
            context.currentSteps = [...Object.values(data.steps)];
        }

        renderApp(appElement, context);

        if (context.code) {
            hljs.highlightAll(codeElement);
        }
    });
};
