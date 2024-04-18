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

export const clickUser = (event) => {
    if (store.active_user_id) {
        store.users[store.active_user_id].isActive = false;
        context.code = null;
    }

    if (+event.target.id !== store.active_user_id) {
        const activeUserId = +event.target.id;

        store.active_user_id = activeUserId;
        store.users[activeUserId].isActive = true;
        store.users[activeUserId].messages_unread = 0;

        startUserSharingSession({
            user_id: activeUserId,
            room_id: store.room_id,
        });
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
};
