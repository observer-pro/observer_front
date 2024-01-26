import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";

export const getAllMessages = () => {
    socket.on("message/user", (data) => {
        console.log("Получен сигнал message/user. Данные:");
        console.log(data);

        store.users[data.user_id].messages = [...data.messages];
        context.allMessages = [...store.users[data.user_id].messages];

        render(context, ["add-message-form"]);
    });
};
