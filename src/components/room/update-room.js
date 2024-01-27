import socket from "../../services/socket.js";
import context from "../../store/context.js";
import store from "../../store/store.js";
import hljs from "../../services/highlight.js";
import { getAllUsers } from "../../utils/get-all-users.js";
import { render } from "../../render.js";
import { codeElement } from "../../main.js";

const newUrl = new URL(window.location.href);

export const updateRoom = () => {
    socket.on("room/update", (data) => {
        console.log(`Получен сигнал room/update. Данные:`);
        console.log(data);

        store.host_id = data.host;
        store.room_id = data.id;
        store.users = { ...getAllUsers(data) };

        if (
            !Object.values(store.users).find(
                ({ id }) => id === store.active_user_id,
            )
        ) {
            store.active_user_id = null;
            store.files = {};
            context.filetree = null;
            context.code = null;
        } else {
            store.users[store.active_user_id].isActive = true;
        }

        context.isDisconnected = false;
        context.isReconnecting = false;
        context.activeUserId = store.active_user_id;
        context.room = {
            id: store.room_id,
            users: Object.values(store.users),
        };

        if (context.isClosed) {
            context.isStart = true;

            window.history.pushState({}, document.title, newUrl.origin);
        } else {
            localStorage.setItem("ROOM_ID", store.room_id);
            localStorage.setItem("HOST_ID", store.host_id);
        }

        if (store.is_first_loading) {
            store.is_first_loading = false;

            newUrl.searchParams.set("room", store.room_id);
            window.history.replaceState({}, document.title, newUrl.href);

            render(context, ["open-task-editor", "add-user-panel"]);
        } else {
            render(context, ["add-user-panel"]);
        }

        if (context.code) {
            hljs.highlightAll(codeElement);
        }
    });
};
