import socket from "../../services/socket.js";
import context from "../../store/context.js";
import store from "../../store/store.js";
import { renderApp } from "../../render/render-app.js";

const newUrl = new URL(window.location.href);

const resetFileTreeIfUserLeft = () => {
    if (!store.active_user_id) {
        return;
    }

    if (!store.users[store.active_user_id]) {
        store.active_user_id = null;
        store.files = [];
        context.filetree = null;
        context.code = null;
    } else {
        store.users[store.active_user_id].isActive = true;
    }
};

const subtractSets = (setA, setB) => {
    let result = new Set(setA);

    for (let element of setB) {
        result.delete(element);
    }

    return [...result];
};

const updateUsersInStore = (updatedUserList) => {
    const updatedUsers = {};

    updatedUserList.forEach((user) => {
        updatedUsers[user.id] = user;
    });

    const updatedKeys = new Set(Object.keys(updatedUsers));
    const storeKeys = new Set(Object.keys(store.users));
    const newcomersIds = subtractSets(updatedKeys, storeKeys);
    const deceasedIds = subtractSets(storeKeys, updatedKeys);

    deceasedIds.forEach((id) => {
        delete store.users[id];
    });
    newcomersIds.forEach((id) => {
        const user = updatedUsers[id];

        store.users[id] = {
            id: user.id,
            name: user.name,
            isActive: false,
            role: user.role,
            messages: [],
            current_path: "",
            messages_unread: 0,
            scroll_code_position: 0,
            scroll_tree_position: 0,
            latest_updated_paths: [],
            steps: [],
        };
    });

    console.log(
        `Добавились пользователи: ${newcomersIds}. Ушли пользователи: ${deceasedIds}`,
    );
};

export const updateRoom = () => {
    socket.on("room/update", (data) => {
        console.log(`Получен сигнал room/update. Данные:`);
        console.log(data);

        // Это нужно, чтобы при первом создании комнаты прописать host и room
        store.host_id = data.host;
        store.room_id = data.id;

        updateUsersInStore(data.users);
        resetFileTreeIfUserLeft();

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
            return;
        } else {
            localStorage.setItem("ROOM_ID", store.room_id);
            localStorage.setItem("HOST_ID", store.host_id);
        }

        if (store.is_first_loading) {
            store.is_first_loading = false;

            newUrl.searchParams.set("room", store.room_id);
            window.history.replaceState({}, document.title, newUrl.href);

            renderApp(context, ["open-task-editor", "update-user-panel"]);
        } else {
            renderApp(context, ["update-user-panel", "update-code-panel"]);
        }
    });
};
