import socket from "../components/socket.js";
import { context, codeElement, appElement } from "../main.js";
import { renderApp } from "../render.js";
import hljs from "../components/hljs.js";

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

    inviteElement.addEventListener("click", (event) => {
        event.preventDefault();

        const server = "http://5.53.125.76:5000/";
        const pluginUrl =
            "https://github.com/Hybusa/observer_java/blob/feature/build/distributions/observer_java-1.0-SNAPSHOT.zip";
        const data = `Комната: ${context.room.id}\nСервер: ${server}\nУстановить плагин: ${pluginUrl}`;

        navigator.clipboard
            .writeText(data)
            .then(() => {
                alert("Данные скопированы в буфер обмена");
            })
            .catch((error) => {
                alert("Ошибка при копировании данных", error);
            });
    });
};
export const initQuitRoom = () => {
    const quitElement = document.querySelector("#quit");

    quitElement?.addEventListener("click", (event) => {
        event.preventDefault();

        context.isClosed = true;
        context.isStart = true;
        window.localStorage.clear();

        renderApp(appElement, context);
        closeRoom({ room_id: context.room.id });
    });
};
