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

    userElements.forEach((element) => {
        element.addEventListener("click", () => {
            userElements.forEach((element) => {
                endStudent(element.id);
            });

            startStudent(element.id);
        });
    });
}
