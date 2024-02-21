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
    const number = index + 1;

    steps[number] = status;
    store.users[store.active_user_id].steps[index] = status;
    context.currentSteps = [...store.users[store.active_user_id].steps];

    renderApp(context, ["update-steps-status"]);
    sendStep({ user_id: store.active_user_id, steps });
};

export const handleSendSteps = () => {
    const acceptElements = document.querySelectorAll(".accept");
    const returnElements = document.querySelectorAll(".return");
    const completeElements = document.querySelectorAll(".complete");
    const steps = {};

    acceptElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();

            const index = +element.dataset.index;

            setNewStep("ACCEPTED", steps, index);
        });
    });

    returnElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();

            const index = +element.dataset.index;

            setNewStep("NONE", steps, index);
        });
    });

    completeElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();

            const index = +element.dataset.index;

            setNewStep("NONE", steps, index);
        });
    });
};
