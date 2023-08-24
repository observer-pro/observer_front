"use strict";

import "./css/main.css";
import Context from "./context.js";
import { renderApp } from "./render.js";
import { getStatus, updateRoom } from "./socket.js";

const appElement = document.querySelector("#app");
const context = new Context(true, false);

renderApp(appElement, context);

getStatus((status) => {
    context.isOnline = status;

    renderApp(appElement, context);
});

updateRoom((isStart, data) => {
    context.isStart = isStart;
    context.room = data;

    renderApp(appElement, context);
});
