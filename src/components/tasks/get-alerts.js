import socket from "../../services/socket.js";
import context from "../../store/context.js";
import { render } from "../../render.js";

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

            render(context, ["send-tasks"]);

            context.isNotion = true;
        } else {
            context.isNotion = true;

            render(context, ["send-tasks"]);
        }
    });
};
