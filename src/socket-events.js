import { io } from "socket.io-client";

const socket = io("http://5.53.125.76:5000/", {
    transports: ["websocket"],
});

export const getStatus = (set) => {
    socket.on("log", (log) => {
        socket.on("connect", () => {
            console.log("Коннект");

            set(true, log);
        });
        socket.on("disconnect", () => {
            set(false, log);
        });
    });
};
export const createRoom = (name) => {
    console.log(`Отправлен запрос room/create. Пользователь: ${name}`);

    socket.emit("room/create", { name: name });
};
export const updateRoom = (set) => {
    socket.on("room/update", (data) => {
        console.log(`Запрос room/update. Получены данные:`);
        console.log(data);

        set(false, data);
    });
};
export const endStudent = (userId, roomId) => {
    console.log(
        `Отправлен запрос sharing/end. Пользователь: ${userId} отключен`,
    );

    socket.emit("sharing/end", { user_id: userId, room_id: roomId });
};
export const startStudent = (userId, roomId) => {
    console.log(
        `Отправлен запрос sharing/start. Пользователь: ${userId} подключен`,
    );

    socket.emit("sharing/start", { user_id: userId, room_id: roomId });
};
export const getCode = (set) => {
    socket.on("sharing/code_send", (data) => {
        console.log(`Выполнен запрос sharing/code_send. Получены данные:`);
        console.log(data);

        set(data);
    });
};
export const updateCode = (set) => {
    socket.on("sharing/code_update", (data) => {
        console.log(`Выполнен запрос sharing/code_update. Получены данные:`);
        console.log(data);

        set(data);
    });
};
export const disconnect = (set) => {
    socket.on("disconnect", () => {
        console.log("Дисконнект");

        set(false);
    });
};
export const reconnect = (data) => {
    socket.emit("room/rehost", data);
};
