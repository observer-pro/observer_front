import template from "./template.pug";
import { initChangingUsers, initCreatingRoom } from "./events.js";

export function renderApp(appElement, context) {
    appElement.innerHTML = template({ context: context });

    initCreatingRoom();
    initChangingUsers();
}
