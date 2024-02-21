import start from "../templates/start.pug";
import main from "../templates/main.pug";
import renderCore from "./render-core.js";
import { handleSetNewAddress } from "../components/connection/set-new-address.js";
import { handleCreateRoom } from "../components/room/create-room.js";

export const renderApp = (context, events = []) => {
    const appElement = document.getElementById("app");

    if (context.isStart) {
        appElement.innerHTML = start({ context });

        handleSetNewAddress();
        handleCreateRoom();
    } else {
        if (events.includes("open-task-editor")) {
            appElement.innerHTML = main({ context });
        }

        events.forEach((event) => {
            renderCore[event](context);
        });
    }
};
