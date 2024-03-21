import start from "../templates/start.pug";
import main from "../templates/main.pug";
import renderCore from "./render-core.js";
import { handleSetNewAddress } from "../components/connection/set-new-address.js";
import { handlers } from "../handlers.js";

export const renderApp = (context, events = []) => {
    const appElement = document.getElementById("app");

    if (context.isStart) {
        appElement.innerHTML = start({ context });

        handleSetNewAddress();
    } else {
        if (events.includes("open-task-editor")) {
            appElement.innerHTML = main({ context });
        }

        events.forEach((event) => {
            renderCore[event](context);
        });
    }

    const clickableElements = document.querySelectorAll("[\\@click]");

    clickableElements.forEach((element) => {
        const handlerName = element.getAttribute("@click");

        element.addEventListener("click", (event) => {
            handlers[handlerName](event);
        });
    });
};
