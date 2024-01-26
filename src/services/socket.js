import { io } from "socket.io-client";
import store from "../store/store";

const webserver = store.server;

const socket = io(`${webserver}`, {
    transports: ["websocket"],
});

export default socket;
