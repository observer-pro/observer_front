import start from "../templates/start.pug";
import main from "../templates/main.pug";
import {
    initClickingFiles,
    initClickingUsers,
    initCreatingRoom,
    initQuitRoom,
    initReconnecting,
} from "../click-events.js";

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
    }
};
