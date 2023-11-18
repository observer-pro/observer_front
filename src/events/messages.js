import { getActiveFile } from "../components/active-files.js";
import { getDateTime } from "../components/functions.js";
import socket from "../components/socket.js";
import { context, appElement } from "../main.js";
import { renderApp } from "../render.js";

const sendNewMessage = (userId, roomId, content) => {
    const data = {
        user_id: userId,
        room_id: roomId,
        content,
    };

    console.log("Отправлен запрос message/to_client. Данные:");
    console.log(data);

    socket.emit("message/to_client", data);
};

export const initSendingMessage = () => {
    const textElement = document.querySelector("#message-text");
    const buttonElement = document.querySelector("#send-message");

    buttonElement?.addEventListener("click", () => {
        const content = textElement.value;
        const date = new Date();

        if (content) {
            context.allMessages.push({
                sender: context.room.host,
                receiver: context.activeUserId,
                content,
                created_at: getDateTime(
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                ),
            });

            sendNewMessage(context.activeUserId, context.room.id, content);
            renderApp(appElement, context);

            if (context.code) {
                getActiveFile(context);
            }
        }
    });
};
export const receiveNewMessage = () => {
    socket.on("message/to_mentor", (data) => {
        console.log("Принят запрос message/to_menthor. Данные:");
        console.log(data);

        context.allMessages.push({
            sender: data.user_id,
            receiver: context.room.host,
            content: data.content,
            created_at: data.datetime,
        });

        renderApp(appElement, context);

        if (context.code) {
            getActiveFile(context);
        }
    });
};
