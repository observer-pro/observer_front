import { io } from "socket.io-client";

const socket = io("http://5.53.125.76:5000/", {
    transports: ["websocket"],
});

export const getStatus = (set) => {
    socket.on("log", (log) => {
        socket.on("connect", () => {
            set(true, log);
        });
        socket.on("disconnect", () => {
            set(false, log);
        });
    });
};
export const createRoom = (name) => {
    socket.emit("room/create", { name: name });
};
export const updateRoom = (set) => {
    socket.on("room/update", (data) => {
        set(false, data);
    });
};
export const endStudent = (userId, roomId) => {
    socket.emit("sharing/end", { user_id: userId, room_id: roomId });
};
export const startStudent = (userId, roomId) => {
    socket.emit("sharing/start", { user_id: userId, room_id: roomId });
};
export const sendCode = (set) => {
    socket.on("sharing/code_send", (data) => {
        set(data);
    });
};
export const updateCode = (set) => {
    socket.on("sharing/code_update", (data) => {
        set(data);
    });
};
