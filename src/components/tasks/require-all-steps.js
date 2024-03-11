import socket from "../../services/socket.js";

export const requireAllSteps = () => {
    socket.emit("steps/table", {});
    console.log("Отправлен сигнал steps/table");
};
