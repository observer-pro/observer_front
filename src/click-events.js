import { context } from "./main.js";
import { createRoom, startStudent, endStudent } from "./socket-events.js";

export const initCreatingRoom = () => {
    const createElement = document.querySelector("#create-room");

    createElement?.addEventListener("click", () => {
        createRoom("JSON JSONych");
    });
};
export const initClickingUsers = () => {
    const userElements = document.querySelectorAll(".item");

    userElements.forEach((user) => {
        user.addEventListener("click", () => {
            window.localStorage.setItem("user_id", user.id);

            userElements.forEach((user) => {
                endStudent(user.id, context.room.id);
            });

            startStudent(user.id, context.room.id);
        });
    });
};
