"use strict";

import "./css/main.css";
import Context from "./components/context.js";
import { renderApp } from "./components/render.js";
import {
    getStatus,
    sendCode,
    updateCode,
    updateRoom,
} from "./socket-events.js";
import { getFiletree } from "./components/filetree.js";

const appElement = document.querySelector("#app");

export const context = new Context(true, false);

renderApp(appElement, context);
getStatus((status, log) => {
    context.isOnline = status;
    context.hostName = `${log.message.split(" ")[0]} ${
        log.message.split(" ")[1]
    }`;

    renderApp(appElement, context);
});
updateRoom((isStart, data) => {
    context.isStart = isStart;
    context.room = data;
    context.room.users.map((user) => {
        if (user.id === context.activeUserId) {
            user.isActive = true;
        }
    });

    renderApp(appElement, context);
});
sendCode((data) => {
    context.filetree = getFiletree(data.files);
    context.room.users.map((user) => (user.isActive = false));
    context.room.users.map((user) => {
        if (user.id === context.activeUserId) {
            user.isActive = true;
        }
    });

    renderApp(appElement, context);
});
updateCode((data) => {
    context.filetree = getFiletree(data.files);

    renderApp(appElement, context);
});
