import { createRoom, endStudent, startStudent } from "./socket-events.js";
import { context } from "./main.js";
import hljs from "./hljs.js";
import { getActiveFile } from "./components/get-active-files.js";

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
    const codeElement = document.querySelector("code");

    fileElements.forEach((element) => {
        element.addEventListener("click", () => {
            const fileName = element.textContent;

            getActiveFile(fileName, context);
            hljs.highlightAll(codeElement);
        });
    });
};
