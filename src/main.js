"use strict";

import "./css/main.css";
import Context from "./components/context.js";
import { renderApp } from "./render.js";
import { connect, disconnect } from "./events/connect-disconnect.js";
import { updateRoom } from "./events/room.js";
import { sendCode, updateCode } from "./events/files.js";
import { getSignal } from "./events/signals.js";

export const appElement = document.querySelector("#app");
export const codeElement = document.querySelector("code");
export const context = new Context(true, false, true, "Host", null, false);

renderApp(appElement, context);
connect((status) => {
    context.isOnline = status;

    renderApp(appElement, context);
});
disconnect((status) => {
    context.isOnline = status;

    renderApp(appElement, context);
});
updateRoom();
sendCode();
updateCode();
disconnect((status) => {
    context.isDisconnected = !status;

    renderApp(appElement, context);
});
getSignal();
