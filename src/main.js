"use strict";

import "./css/main.css";
import Context from "./components/context.js";
import { renderApp } from "./render.js";
import { disconnect, getStatus } from "./events/connect-disconnect.js";
import { updateRoom } from "./events/room.js";
import { sendCode, updateCode } from "./events/files.js";
import { getSignal } from "./events/signals.js";

export const appElement = document.querySelector("#app");
export const codeElement = document.querySelector("code");
export const context = new Context(true, false, true);

getStatus((status, log) => {
    context.isOnline = status;
    context.hostName = `${log.message.split(" ")[0]} ${
        log.message.split(" ")[1]
    }`;

    renderApp(appElement, context);
});
updateRoom();
sendCode();
updateCode();
disconnect((status) => {
    context.isDisconnected = status;

    renderApp(appElement, context);
});
getSignal();
