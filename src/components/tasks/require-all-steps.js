import socket from "../../services/socket.js";

export const requireAllSteps = () => {
    console.log("Отправлен сигнал steps/table");

    socket.emit("steps/table", {});
};
