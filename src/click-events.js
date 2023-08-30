import { createRoom, endStudent, startStudent } from "./socket-events.js";
import { context } from "./main.js";

export const initCreatingRoom = () => {
    const createElement = document.querySelector("#create-room");

    createElement?.addEventListener("click", () => {
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
