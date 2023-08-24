"use strict";

import "./css/main.css";
import Context from "./context.js";
import { renderApp } from "./render.js";
import { getStatus, sendCode, updateRoom } from "./socket.js";

export const appElement = document.querySelector("#app");
export const context = new Context(true, false);

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

sendCode((index) => {
    console.log(index);

    renderApp(appElement, context);
});
