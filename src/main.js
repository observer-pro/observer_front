"use strict";

import "./css/main.css";
import { getContext } from "./components/context.js";
import { renderApp } from "./components/render.js";
import {
    getStatus,
    getCode,
    updateRoom,
    updateCode,
    disconnect,
} from "./socket-events.js";
import { getFiletree, removeExtraFiles } from "./components/filetree.js";
import { getActiveFile } from "./components/active-files.js";

export const appElement = document.querySelector("#app");
export const codeElement = document.querySelector("code");
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
    context.isDisconnected = false;
    context.isReconnecting = false;
    context.isStart = isStart;
    context.room = data;

    context.room.users.map((user) => {
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
    }

    if (context.activeFileName) {
        getActiveFile(context.activeFileName, context);
    } else {
        renderApp(appElement, context);
    }
});
getCode((data) => {
    context.code = null;
    context.activeFileName = null;
    context.files = data.files;
    context.filetree = getFiletree(data.files);
    context.room.users.map((user) => {
        if (user.id === context.activeUserId) {
            user.isActive = true;
        } else {
            user.isActive = false;
        }
    });

    renderApp(appElement, context);
});
updateCode((data) => {
    context.code = null;

    removeExtraFiles([...context.files, ...data.files], (result) => {
        context.filetree = getFiletree(result);
    });

    context.room.users.map((user) => {
        if (user.id === context.activeUserId) {
            user.isActive = true;
        } else {
            user.isActive = false;
        }
    });

    getActiveFile(context.activeFileName, context);
});
disconnect((status) => {
    context.isDisconnected = status;

    renderApp(appElement, context);
});
