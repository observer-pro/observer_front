import socket from "../../services/socket.js";
import context from "../../store/context.js";
import { render } from "../../render.js";

export const handleNotion = () => {
    const notionInputElement = document.getElementById("notion-input");
    const notionBtnElement = document.getElementById("notion-btn");

    notionInputElement?.addEventListener("click", () => {
        if (context.isNotion) {
            context.isNotion = false;
            context.notionError = false;

            render(context, ["send-tasks"]);
        }
    });

    notionBtnElement?.addEventListener("click", () => {
        const notionUrl = notionInputElement.value;

        if (notionUrl.length > 0) {
            context.isNotion = false;

            render(context, ["send-tasks"]);

            socket.emit("steps/import", { url: notionUrl });
            console.log("Отправлен сигнал steps/import. Отправлены данные:\n", {
                url: notionUrl,
            });
        }
    });
};
