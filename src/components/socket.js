import { io } from "socket.io-client";

const webserver = window.localStorage.getItem("SERVER");

const socket = io(`${webserver}`, {
    transports: ["websocket"],
});

export default socket;
