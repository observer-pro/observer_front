import socket from "../../services/socket.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

export const getAlerts = () => {
    socket.on("alerts", (alerts) => {
        console.log("Получен сигнал alerts. Данные:");
        console.log(alerts);

        alert(`${alerts.type}: ${alerts.message}`);

        if (
            alerts.type === "ERROR" &&
            alerts.message.startsWith(
                "Could not extract domain and page_id from url",
            )
        ) {
            console.error(alerts);
            context.notionError = true;

            renderApp(context, ["update-task-editor"]);

            context.isNotion = true;
        } else {
            context.isNotion = true;

            renderApp(context, ["update-task-editor"]);
        }
    });
};
