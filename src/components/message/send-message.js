import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";

const sendSignal = (data) => {
    console.log("Отправлен сигнал message/to_client. Данные:");
    console.log(data);

    socket.emit("message/to_client", data);
};

const sendNewMessage = (content) => {
    const newMessage = {
        sender: store.host_id,
        receiver: store.active_user_id,
        content,
    };

    if (content) {
        store.users[store.active_user_id]?.messages.push(newMessage);

        if (store.active_user_id) {
            context.allMessages = [
                ...store.users[store.active_user_id].messages,
            ];
        }

        sendSignal({
            user_id: store.active_user_id,
            room_id: store.room_id,
            content,
        });
        render(context, ["add-message-form"]);
    }
};

export const handleSendMessage = () => {
    const messageInputElement = document.getElementById("message-text");
    const sendButtonElement = document.getElementById("send-message");

    let content = "";

    messageInputElement?.addEventListener("input", (event) => {
        content = event.target.value;
    });

    messageInputElement?.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            sendNewMessage(content);
        }
    });

    sendButtonElement?.addEventListener("click", () => {
        sendNewMessage(content);
    });
};
