import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

const sendStep = (data) => {
    socket.emit("steps/status/to_client", data);
    console.log("Отправлен сигнал steps/status/to_client. Данные:");
    console.log(data);
};

const setNewStep = (status, steps, index) => {
    steps[index] = status;
    store.users[store.active_user_id].steps[index] = status;
    context.currentSteps = { ...store.users[store.active_user_id].steps };

    renderApp(context, ["update-steps-status"]);
    sendStep({ user_id: store.active_user_id, steps });
};

export const sendSteps = (event) => {
    const index = event.target.dataset.index;
    const status = event.target.dataset.status;
    const steps = {};

    setNewStep(status, steps, index);
};
