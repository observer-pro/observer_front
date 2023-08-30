"use strict";

import "./css/main.css";
import Context from "./context.js";
import { renderApp } from "./render.js";
import { getStatus, shareCode, updateRoom } from "./socket-events.js";

const appElement = document.querySelector("#app");

export const context = new Context(true, false);

renderApp(appElement, context);
getStatus((status) => {
    context.isOnline = status;

    renderApp(appElement, context);
});
updateRoom((isStart, data) => {
    context.isStart = isStart;
    context.room = data;
    context.hostId = data.users[0].id;

    renderApp(appElement, context);
});
shareCode((data) => {
    context.activeUser = +window.localStorage.getItem("user_id");

    context.files = data.files;

    renderApp(appElement, context);
});
