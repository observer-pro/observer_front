import { io } from "socket.io-client";

const socket = io("http://5.53.125.76:5000/", {
    transports: ["websocket"],
});

export default socket;
