import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";

export const receiveSteps = () => {
    socket.on("steps/status/to_mentor", (data) => {
        console.log("Получен сигнал steps/status/to_mentor. Данные:");
        console.log(data);

        store.users[data.user_id].steps = [...Object.values(data.steps)];
        store.users[data.user_id].is_got_steps = true;
        context.currentSteps = [...store.users[data.user_id].steps];
        context.room = {
            id: store.room_id,
            users: Object.values(store.users),
        };

        if (store.active_user_id) {
            render(context, ["add-user-panel", "add-message-form"]);
        } else {
            render(context, ["add-user-panel", "send-tasks"]);
        }
    });
};
