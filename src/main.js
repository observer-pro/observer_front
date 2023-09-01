"use strict";

import "./css/main.css";
import { getContext } from "./components/context.js";
import { renderApp } from "./components/render.js";
import { getStatus, getCode, updateRoom, updateCode } from "./socket-events.js";
import { getFiletree } from "./components/filetree.js";

export const appElement = document.querySelector("#app");
export const context = getContext();

renderApp(appElement, context);
getStatus((status, log) => {
    context.isOnline = status;
    context.hostName = `${log.message.split(" ")[0]} ${
        log.message.split(" ")[1]
    }`;

    renderApp(appElement, context);
});
updateRoom((isStart, data) => {
    let isActiveFiles = false;

    context.isStart = isStart;
    context.room = data;
    context.room.users.map((user) => {
        if (user.id === context.activeUserId) {
            isActiveFiles = true;
            user.isActive = true;
        }
    });

    if (!isActiveFiles) {
        context.filetree = null;
    }

    renderApp(appElement, context);
});
getCode((data) => {
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
    console.log(data);
});
