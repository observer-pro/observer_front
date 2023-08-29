import main from "./templates/main.pug";
import { initChangingUsers, initCreatingRoom } from "./click-events.js";

export function renderApp(appElement, context) {
    appElement.innerHTML = main({ context: context });

    initCreatingRoom();
    initChangingUsers();
}
