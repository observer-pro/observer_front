import context from "../../store/context.js";
import { render } from "../../render.js";

export const handleToggleForm = () => {
    const converterElement = document.getElementById("converter");

    converterElement?.addEventListener("click", (event) => {
        event.preventDefault();

        if (!context.isFormConverted) {
            context.isFormConverted = true;
        } else {
            context.isFormConverted = false;
        }

        render(context, ["add-message-form"]);
    });
};
