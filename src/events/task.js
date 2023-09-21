import socket from "../components/socket.js";
import { appElement, context } from "../main.js";
import { renderApp } from "../render.js";

export const initOpeningTask = () => {
    const showTaskElement = document.querySelector("#show-task");

    showTaskElement.addEventListener("click", () => {
        context.isShowingTask = true;
        context.room.users.map((user) => (user.isActive = false));

        renderApp(appElement, context);
    });
};
export const initSendingTask = () => {
    const areaElement = document.querySelector("#task-area");
    const sendTaskElement = document.querySelector("#send-task");

    sendTaskElement?.addEventListener("click", () => {
        const data = {
            content: areaElement.value,
        };

        console.log("Отправлен запрос exercise. Отправлены данные:");
        console.log(data);

        socket.emit("exercise", data);
    });
};
