import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";
import { requireAllMessages } from "../message/require-all-messages.js";
import { requireAllSteps } from "../tasks/require-all-steps.js";

const startUser = (data) => {
    console.log(
        `Отправлен сигнал sharing/start. Пользователь: ${data.user_id} подключен`,
    );

    socket.emit("sharing/start", data);
};

const endUser = (data) => {
    console.log(
        `Отправлен сигнал sharing/end. Пользователь: ${data.user_id} отключен`,
    );

    socket.emit("sharing/end", data);
};

function clickUser() {
    if (store.active_user_id) {
        store.users[store.active_user_id].isActive = false;

        endUser({
            user_id: store.active_user_id,
            room_id: store.room_id,
        });
    }

    store.active_user_id = +this.id;
    store.users[+this.id].isActive = true;

    if (store.users[+this.id].is_first_click) {
        store.users[+this.id].is_first_click = false;

        requireAllMessages({ user_id: +this.id });
    }

    if (!store.users[+this.id].is_got_steps) {
        store.users[+this.id].is_got_steps = true;

        requireAllSteps();
    }

    startUser({ user_id: +this.id, room_id: store.room_id });

    context.isShowingTask = false;
    context.activeUserId = store.active_user_id;
    context.activeUserName = store.users[+this.id].name;
    context.room = {
        id: store.room_id,
        users: Object.values(store.users),
    };

    render(context, ["open-task-editor", "add-user-panel", "add-message-form"]);

    this.removeEventListener("click", clickUser);
}

export const handleSelectUser = () => {
    const userElements = document.querySelectorAll(".item");

    userElements.forEach((user) => {
        if (+user.id !== store.active_user_id) {
            user.addEventListener("click", clickUser);
        }
    });
};
