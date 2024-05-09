import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

export const handleToggleMessageForm = () => {
    const toggleMessageElement = document.getElementById("toggle-message");

    toggleMessageElement.addEventListener("click", (event) => {
        event.preventDefault();

        context.isFormConverted = !context.isFormConverted;

        renderApp(context, ["update-message-form"]);
    });
};
