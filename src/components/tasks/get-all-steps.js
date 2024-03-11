import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";

export const getAllSteps = () => {
    socket.on("steps/table", (data) => {
        console.log("Получен сигнал steps/table. Данные:");
        console.log(data);

        data.forEach((step) => {
            if (step.user_id === store.active_user_id) {
                store.users[store.active_user_id].steps = { ...step.steps };
                context.currentSteps = {
                    ...store.users[store.active_user_id].steps,
                };
            }
        });
    });
};
