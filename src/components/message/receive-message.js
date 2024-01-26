import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";

export const receiveMessage = () => {
    socket.on("message/to_mentor", (data) => {
        console.log("Получен сигнал message/to_mentor. Данные:");
        console.log(data);

        const newMessage = {
            sender: data.user_id,
            receiver: store.host_id,
            content: data.content,
        };

        store.users[store.active_user_id].messages.push(newMessage);
        context.allMessages = [...store.users[store.active_user_id].messages];

        render(context, ["add-message-form"]);
    });
};
