import store from "../../store/store.js";
import context from "../../store/context.js";
import { reconnect } from "../../components/connection/connection.js";
import { renderApp } from "../../render/render-app.js";

const urlParams = new URLSearchParams(window.location.search);
const roomParams = urlParams.get("room");

export const rehostRoom = (event) => {
    event.preventDefault();

    context.isReconnecting = true;

    renderApp(context, ["update-user-panel"]);
    reconnect({
        room_id: store.room_id,
        user_id: store.host_id,
    });

    setTimeout(() => {
        if (context.isDisconnected) {
            context.isReconnecting = false;

            renderApp(context, ["update-user-panel"]);
        }
    }, 3000);
};

export const rehostRoomAfterRefresh = () => {
    if (roomParams) {
        context.isStart = false;
        context.isClosed = false;
        context.taskNumber = 1;

        localStorage.removeItem("TASK_NUMBER");

        reconnect({
            room_id: store.room_id,
            user_id: store.host_id,
        });
    }
};
