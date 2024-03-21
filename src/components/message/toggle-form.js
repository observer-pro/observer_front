import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

export const toggleMessageForm = (event) => {
    event.preventDefault();

    if (!context.isFormConverted) {
        context.isFormConverted = true;
    } else {
        context.isFormConverted = false;
    }

    renderApp(context, ["update-message-form"]);
};
