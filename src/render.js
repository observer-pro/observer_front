import start from "./templates/start.pug";
import main from "./templates/main.pug";
import { initCreatingRoom, initInviting, initQuitRoom } from "./events/room.js";
import { initClickingUsers } from "./events/users.js";
import { initClickingFiles } from "./events/files.js";
import { initReconnecting } from "./events/connect-disconnect.js";
import { initOpeningTask, initSendingTask } from "./events/task.js";

export const renderApp = (appElement, context) => {
    if (context.isStart) {
        appElement.innerHTML = start({ context: context });

        initCreatingRoom();
    } else {
        appElement.innerHTML = main({ context: context });

        initClickingUsers();
        initClickingFiles();
        initReconnecting();
        initQuitRoom();
        initOpeningTask();
        initSendingTask();
        initInviting();
    }
};
