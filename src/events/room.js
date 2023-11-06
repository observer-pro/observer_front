import socket from "../components/socket.js";
import { context, appElement, codeElement } from "../main.js";
import { renderApp } from "../render.js";
import ClipboardJS from "clipboard";
import hljs from "../components/hljs.js";

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
        window.localStorage.setItem("ROOM_ID", data.id);
        window.localStorage.setItem("HOST_ID", data.users[0].id);

        context.isDisconnected = false;
        context.isReconnecting = false;
        context.isStart = false;
        context.room = data;

        context.room.users.map((user) => {
            if (user.id === context.activeUserId) {
                user.isActive = true;
            } else {
                user.isActive = false;
            }
        });
        context.room.users.map((user) => (user.signal = "NONE"));

        if (!context.room.users.find((user) => user.isActive)) {
            context.filetree = null;
            context.code = null;
            context.activeFileName = null;
        }

        if (!context.isClosed) {
            renderApp(appElement, context);
        }

        if (context.code) {
            hljs.highlightAll(codeElement);
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
        context.currentAddress = window.localStorage.getItem("SERVER");

        window.localStorage.removeItem("TASK");
        window.localStorage.removeItem("ROOM_ID");
        window.localStorage.removeItem("HOST_ID");
        window.history.pushState({}, document.title, newUrl.origin);

        renderApp(appElement, context);
        closeRoom({ room_id: context.room.id });
    });
};
