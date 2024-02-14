import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";

export const receiveMessage = () => {
    socket.on("message/to_mentor", (data) => {
        console.log("Получен сигнал message/to_mentor. Данные:");
        console.log(data);
        // TODO Использовать ключи sender и receiver после обновления сервера
        const sender_id = data.sender;
        const receiver_id = data.receiver;
        const newMessage = {
            sender: sender_id,
            receiver: receiver_id,
            content: data.content,
        };

        if (!store.users[sender_id]) {
            throw new Error(
                "Получено сообщение от несуществующего пользователя",
            );
        }

        store.users[sender_id].messages.push(newMessage);

        // Не увеличиваем счетчик для активного пользователя
        if (store.active_user_id !== sender_id) {
            store.users[sender_id].messages_unread += 1;
        }

        render(context, ["update-user-panel"]);

        if (sender_id === store.active_user_id) {
            context.allMessages = [...store.users[sender_id].messages];

            render(context, ["update-message-form"]);
        }
    });
};
