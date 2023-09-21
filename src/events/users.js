import socket from "../components/socket.js";
import { context } from "../main.js";

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
            context.isShowingTask = false;

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
