import socket from "../components/socket.js";
import { context } from "../main.js";
import { requireAllMessages } from "./messages.js";

const startStudent = (userId, roomId) => {
    console.log(
        `Отправлен запрос sharing/start. Пользователь: ${userId} подключен`,
    );

    socket.emit("sharing/start", { user_id: userId, room_id: roomId });
};
const endStudent = (userId, roomId) => {
    console.log(
        `Отправлен запрос sharing/end. Пользователь: ${userId} отключен`,
    );

    socket.emit("sharing/end", { user_id: userId, room_id: roomId });
};

export const initClickingUsers = () => {
    const userElements = document.querySelectorAll(".item");

    userElements.forEach((user) => {
        user.addEventListener("click", () => {
            context.activeUserId = +user.id;
            context.activeUserName = user.dataset.name;
            context.isShowingTask = false;

            window.localStorage.setItem("ACTIVE_USER_ID", user.id);

            requireAllMessages(+user.id);

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
