"use strict";

import "./css/main.css";
import Context from "./components/context.js";
import { renderApp } from "./render.js";
import { connect, disconnect, reconnect } from "./events/connect-disconnect.js";
import { updateRoom } from "./events/room.js";
import { sendCode, updateCode } from "./events/files.js";
import { getSignal } from "./events/signals.js";

const ROOM_ID = +window.localStorage.getItem("ROOM_ID");
const HOST_ID = +window.localStorage.getItem("HOST_ID");
const urlParams = new URLSearchParams(window.location.search);
const roomParam = urlParams.get("room");

export const appElement = document.querySelector("#app");
export const codeElement = document.querySelector("pre.line-numbers");
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

if (roomParam) {
    reconnect({
        room_id: ROOM_ID,
        user_id: HOST_ID,
    });
}
