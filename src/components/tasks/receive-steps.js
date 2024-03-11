import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

export const receiveSteps = () => {
    socket.on("steps/status/to_mentor", (data) => {
        console.log("Получен сигнал steps/status/to_mentor. Данные:");
        console.log(data);

        store.users[data.user_id].steps = { ...data.steps };
        context.currentSteps = { ...store.users[data.user_id].steps };
        context.room = {
            id: store.room_id,
            users: Object.values(store.users),
        };

        if (store.active_user_id) {
            renderApp(context, ["update-user-panel", "update-steps-status"]);
        } else {
            renderApp(context, ["update-user-panel"]);
        }
    });
};
