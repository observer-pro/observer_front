import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

export const sendTasks = () => {
    if (!context.isSent) {
        const allTasks = [];

        for (let key in store.tasks) {
            if (store.tasks[key]) {
                const task = {
                    name: key,
                    content: store.tasks[key],
                    language: "html",
                    type: key === "theory" ? "theory" : "exercise",
                };

                allTasks.push(task);
            }
        }

        context.isSent = true;

        renderApp(context, ["update-task-editor"]);
        socket.emit("steps/all", allTasks);

        console.log("Отправлен сигнал steps/all. Данные:");
        console.log(allTasks);
    }
};
