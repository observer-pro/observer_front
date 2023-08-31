import { createRoom, endStudent, startStudent } from "./socket-events.js";
import { appElement, context } from "./main.js";
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
            userElements.forEach((user) =>
                endStudent(+user.id, context.room.id),
            );
            context.activeUserId = +user.id;

            startStudent(+user.id, context.room.id);
        });
    });
};
export const initClickingFiles = () => {
    const fileElements = document.querySelectorAll(".file");

    fileElements.forEach((element) => {
        element.addEventListener("click", () => {
            context.filetree.files.forEach((file) => {
                if (file.name === element.textContent) {
                    file.isActive = true;
                } else {
                    file.isActive = false;
                }
            });
            context.filetree.dirs.forEach((dir) => {
                context.filetree[dir].files.forEach((file) => {
                    if (file.name === element.textContent) {
                        file.isActive = true;
                    } else {
                        file.isActive = false;
                    }
                });
            });

            renderApp(appElement, context);
        });
    });
};
