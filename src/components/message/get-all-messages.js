import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

export const getAllMessages = () => {
    socket.on("message/user", (data) => {
        console.log("Получен сигнал message/user. Данные:");
        console.log(data);

        store.users[data.user_id].messages = [...data.messages];

        if (store.active_user_id === data.user_id) {
            context.allMessages = [...store.users[data.user_id].messages];

            renderApp(context, ["update-message-form"]);
        }
    });
};
