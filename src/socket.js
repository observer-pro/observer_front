import { io } from "socket.io-client";
import { context } from "./main.js";

const socket = io("http://5.53.125.76:5000/", {
    transports: ["websocket"],
});

export function getStatus(set) {
    socket.on("connect", () => {
        set(true);
    });
}

export function createRoom(name) {
    socket.emit("room/create", { name: name });
}

export function updateRoom(set) {
    socket.on("room/update", (data) => {
        set(false, data);
    });
}

export function startStudent(id) {
    socket.emit("sharing/start", { user_id: id, room_id: context.room.id });
}

export function endStudent(id) {
    socket.emit("sharing/end", { user_id: id, room_id: context.room.id });
}

export function shareCode(set) {
    socket.on("sharind/code_send", (data) => {
        set(data);
    });

    socket.on("sharing/code_update", (data) => {
        set(data);
    });
}
