import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";
import { requireAllMessages } from "../message/require-all-messages.js";
import { requireAllSteps } from "../tasks/require-all-steps.js";

export const startUserSharingSession = (data) => {
    socket.emit("sharing/start", data);
    console.log(
        `Отправлен сигнал sharing/start. Пользователь: ${data.user_id} подключен`,
    );
};

export const endUserSharingSession = (data) => {
    socket.emit("sharing/end", data);
    console.log(
        `Отправлен сигнал sharing/end. Пользователь: ${data.user_id} отключен`,
    );
};

function clickUser() {
    if (store.active_user_id) {
        store.users[store.active_user_id].isActive = false;

        endUserSharingSession({
            user_id: store.active_user_id,
            room_id: store.room_id,
        });
    }

    const activeUserId = +this.id;

    store.active_user_id = activeUserId;
    store.users[activeUserId].isActive = true;
    store.users[activeUserId].messages_unread = 0;

    startUserSharingSession({ user_id: activeUserId, room_id: store.room_id });
    // TODO Убрать после рефакторинга события коннект-реконнект
    requireAllMessages({ user_id: activeUserId });
    requireAllSteps();

    context.isShowingTask = false;
    context.activeUserId = store.active_user_id;
    context.activeUserName = store.users[activeUserId].name;
    context.room = {
        id: store.room_id,
        users: Object.values(store.users),
    };

    renderApp(context, ["open-task-editor", "update-user-panel"]);
}

export const handleSelectUser = () => {
    const userElements = document.querySelectorAll(".item");

    userElements.forEach((user) => {
        user.addEventListener("click", clickUser);
    });
};
