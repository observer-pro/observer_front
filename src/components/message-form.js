import { context, appElement } from "../main.js";
import { renderApp } from "../render.js";
import { getActiveFile } from "./active-files.js";

export const getAllMessages = (users, hostId, userId) => {
    const hostMessages = users.find((user) => user.id === hostId)?.messages;
    const userMessages = users.find((user) => user.id === userId)?.messages;

    if (!hostMessages && !userMessages) {
        return [];
    }

    if (!hostMessages) {
        return [...userMessages];
    }

    if (!userMessages) {
        return [...hostMessages];
    }

    return [...hostMessages, ...userMessages].sort(
        (a, b) => a.created_at - b.created_at,
    );
};
export const toggleConvertingForm = () => {
    const convertElement = document.querySelector("#converter");

    convertElement?.addEventListener("click", (event) => {
        event.preventDefault();

        if (context.isFormConverted) {
            context.isFormConverted = false;
        } else {
            context.isFormConverted = true;
        }

        renderApp(appElement, context);

        if (context.code) {
            getActiveFile(context);
        }
    });
};
