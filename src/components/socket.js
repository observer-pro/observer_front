import { io } from "socket.io-client";

const socket = io("wss://server.observer-app.pro", {
    transports: ["websocket"],
});

export default socket;
