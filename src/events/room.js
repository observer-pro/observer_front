import socket from "../components/socket.js";
import { context, appElement } from "../main.js";
import { renderApp } from "../render.js";
import ClipboardJS from "clipboard";
import { getActiveFile } from "../components/active-files.js";
import { getAllMessages } from "./messages.js";
import { user_storeage } from "../components/user-storeage.js";
import { getChangedFile } from "../components/changed-files.js";

const newUrl = new URL(window.location.href);

const createRoom = (name) => {
    console.log(`Отправлен запрос room/create. Пользователь: ${name}`);

    socket.emit("room/create", { name: name });
};
const closeRoom = (data) => {
    console.log("Запрос room/close отправлен. Отправлены данные:");
    console.log(data);

    socket.emit("room/close", data);
};

export const initCreatingRoom = () => {
    const createElement = document.querySelector("#create-room");

    createElement.addEventListener("click", () => {
        context.isClosed = false;

        createRoom(context.hostName);
    });
};
export const updateRoom = () => {
    socket.on("room/update", (data) => {
        console.log(`Запрос room/update. Получены данные:`);
        console.log(data);

        newUrl.searchParams.set("room", data.id);
        window.history.replaceState({}, document.title, newUrl.href);

        if (!context.isClosed) {
            window.localStorage.setItem("ROOM_ID", data.id);
            window.localStorage.setItem("HOST_ID", data.host);
        }

        context.isDisconnected = false;
        context.isReconnecting = false;
        context.isStart = false;

        context.room = data;
        context.room.users.map((user) => {
            if (user.role !== "host") {
                user_storeage[user.id] = {
                    name: user.name,
                    messages: [],
                    current_path: "",
                    messages_unread: 0,
                    scroll_code_position: 0,
                    scroll_tree_position: 0,
                    latest_updated_paths: [],
                    steps: [],
                };
            }

            if (user.id === context.activeUserId) {
                user.isActive = true;
            } else {
                user.isActive = false;
            }
        });

        if (!context.room.users.find((user) => user.isActive)) {
            context.filetree = null;
            context.code = null;
            context.activeFileName = null;
            context.activeUserId = null;
        }

        if (context.isClosed) {
            context.code = null;
            context.activeUserId = null;
            context.activeFilePath = null;
            context.isStart = true;

            window.history.pushState({}, document.title, newUrl.origin);
        }

        getAllMessages((messages) => {
            context.allMessages = [...messages];
        });
        getChangedFile(
            context,
            user_storeage[context.activeUserId]?.latest_updated_paths,
        );
        renderApp(appElement, context);

        if (context.code) {
            getActiveFile(context);
        }
    });
};
export const initInviting = () => {
    const inviteElement = document.querySelector("#invite");

    inviteElement?.addEventListener("click", (event) => {
        event.preventDefault();

        const clipboard = new ClipboardJS("#invite", {
            text: () => {
                return inviteElement.dataset.clipboardText;
            },
        });

        clipboard.on("success", () => {
            alert("Текст скопирован в буфер обмена");

            clipboard.destroy();
        });
        clipboard.on("error", () => {
            alert("Ошибка копирования");

            clipboard.destroy();
        });
    });
};
export const initQuitRoom = () => {
    const quitElement = document.querySelector("#quit");

    quitElement?.addEventListener("click", (event) => {
        event.preventDefault();

        context.isClosed = true;
        context.isStart = true;
        context.currentAddress = localStorage.getItem("SERVER");
        // context.isSent = false

        localStorage.removeItem("ROOM_ID");
        localStorage.removeItem("HOST_ID");
        localStorage.removeItem("ACTIVE_USER_ID");
        localStorage.removeItem("ACTIVE_FILE_PATH");
        localStorage.removeItem("FILES");
        // localStorage.removeItem("ALL_TASK")
        // localStorage.removeItem("FILLED_TASK")
        // localStorage.removeItem("ACTIVE_TASK")

        renderApp(appElement, context);
        closeRoom({ room_id: context.room.id });

        window.history.pushState({}, document.title, newUrl.origin);
    });
};
