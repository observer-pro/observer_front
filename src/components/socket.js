import { io } from "socket.io-client";

const socket = io("ws://server.observer-app.pro", {
    transports: ["websocket"],
});

export default socket;
