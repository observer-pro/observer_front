import { createRoom } from "./socket.js";
import { changeStudent } from "./socket.js";

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
            changeStudent(element.id, index + 1);
        });
    });
}
