import {
    createRoom,
    endStudent,
    reconnect,
    startStudent,
} from "./socket-events.js";
import { appElement, context } from "./main.js";
import { getActiveFile } from "./components/active-files.js";
import { renderApp } from "./components/render.js";

export const initCreatingRoom = () => {
    const createElement = document.querySelector("#create-room");

    createElement.addEventListener("click", () => {
        createRoom(context.hostName);
    });
};
export const initClickingUsers = () => {
    const userElements = document.querySelectorAll(".item");

    userElements.forEach((user) => {
        user.addEventListener("click", () => {
            context.activeUserId = +user.id;

            userElements.forEach((user) => {
                if (context.activeUserId === +user.id) {
                    startStudent(+user.id, context.room.id);
                } else {
                    endStudent(+user.id, context.room.id);
                }
            });
        });
    });
};
export const initClickingFiles = () => {
    const fileElements = document.querySelectorAll(".file");

    fileElements.forEach((element) => {
        element.addEventListener("click", () => {
            context.activeFileName = element.textContent;

            getActiveFile(context.activeFileName, context);
        });
    });
};
export const initReconnecting = () => {
    const rehostElement = document.querySelector("#rehost");

    rehostElement?.addEventListener("click", (event) => {
        event.preventDefault();

        context.isReconnecting = true;

        renderApp(appElement, context);
        reconnect({
            user_id: context.room.users[0].id,
            room_id: context.room.id,
        });
    });
};
