import socket from "../../services/socket.js";
import store from "../../store/store.js";

export const loadSteps = () => {
    socket.on("steps/load", (data) => {
        console.log("Получен сигнал steps/load. Данные:");
        console.log(data);

        data.forEach((step) => {
            store.tasks[step.name] = step.content;
        });
    });
};
