import { io } from "socket.io-client";

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

export function changeStudent(id) {
    console.log(
        `Запрос "start from host" отправлен на сервер`,
        `user_id: ${id}`,
    );
}
