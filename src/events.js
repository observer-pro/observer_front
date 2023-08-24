import { appElement, context } from "./main.js";
import { renderApp } from "./render.js";
import { createRoom, endStudent } from "./socket.js";
import { startStudent } from "./socket.js";

export function initCreatingRoom() {
    const createElement = document.querySelector("#create-room");

    createElement?.addEventListener("click", () => {
        createRoom("JSON JSONych");
    });
}

export function initChangingUsers() {
    const userElements = document.querySelectorAll(".item");

    userElements.forEach((element, index) => {
        element.addEventListener("click", () => {
            userElements.forEach((element) => {
                endStudent(element.id);
            });

            context.room.users.map((user) => (user.isActive = false));
            context.room.users[index + 1].isActive = true;

            renderApp(appElement, context);

            startStudent(element.id);
        });
    });
}
