import store from "../../store/store.js";
import context from "../../store/context.js";
import { reconnect } from "../../components/connection/connection.js";
import { render } from "../../render.js";

const urlParams = new URLSearchParams(window.location.search);
const roomParams = urlParams.get("room");

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

export const handleRehostRoom = () => {
    const rehostElement = document.getElementById("rehost");

    rehostElement?.addEventListener("click", (event) => {
        event.preventDefault();

        context.isReconnecting = true;

        render(context, ["update-user-panel"]);
        reconnect({
            room_id: store.room_id,
            user_id: store.host_id,
        });

        setTimeout(() => {
            if (context.isDisconnected) {
                context.isReconnecting = false;

                render(context, ["update-user-panel"]);
            }
        }, 3000);
    });
};
