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

    renderApp(appElement, context);
});

shareCode((data) => {
    context.files = data.files;
    context.room.users.map((user) => (user.isActive = false));
    context.room.users.map((user) => {
        if (user.id === data.user_id) {
            return (user.isActive = true);
        }
    });
    context.room.activeId = data.user_id;
    context.room.users.forEach((user) => {
        if (user.id === data.user_id) {
            context.room.activeName = user.name;
        }
    });

    renderApp(appElement, context);
});
