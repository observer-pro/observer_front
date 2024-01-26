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

        for (let user in store.users) {
            if (data.user_id === store.users[user].id) {
                store.users[user].messages.push(newMessage);
                store.users[user].is_first_click = false;
            }
        }

        if (data.user_id === store.active_user_id) {
            context.allMessages = [...store.users[data.user_id].messages];

            render(context, ["add-message-form"]);
        }
    });
};
