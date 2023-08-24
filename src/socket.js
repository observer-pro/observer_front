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
    // socket.on("room/update", (data) => {
    //     set(false, data);
    // });

    set(false, {
        id: 1001,
        users: [
            {
                id: 101,
                sid: "RaNdOmSoCkEtID",
                room: 1001,
                name: "JSON Statham",
                role: "host",
                messages: [],
            },
            {
                id: 102,
                sid: "RaNdOmSoCkEtID",
                room: 1001,
                name: "Johnny",
                role: "client",
                messages: [],
            },
            {
                id: 103,
                sid: "RaNdOmSoCkEtID",
                room: 1001,
                name: "Vasya",
                role: "client",
                messages: [],
            },
            {
                id: 104,
                sid: "RaNdOmSoCkEtID",
                room: 1001,
                name: "Ibragim",
                role: "client",
                messages: [],
            },
        ],
        host: 101,
        codecaster: null,
    });
}

export function startStudent(id) {
    socket.emit("sharing/start", { user_id: id, room_id: context.room.id });
}

export function endStudent(id) {
    socket.emit("sharing/end", { user_id: id, room_id: context.room.id });
}

export function sendCode(set) {
    // socket.on("sharind/send_code", (data) => {
    //     set(data.files);
    // });

    set();
}
