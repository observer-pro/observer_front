import socket from "../components/socket.js";
import { context, appElement } from "../main.js";
import { getFiletree } from "../components/filetree.js";
import { getActiveFile } from "../components/active-files.js";
import { renderApp } from "../render.js";
import { removeExtraFiles } from "../components/filetree.js";

export const sendCode = () => {
    socket.on("sharing/code_send", (data) => {
        console.log(`Выполнен запрос sharing/code_send. Получены данные:`);
        console.log(data);

        context.code = null;
        context.activeFileName = null;
        context.files = data.files;
        context.filetree = getFiletree(data.files);

        context.room.users.map((user) => {
            if (user.id === context.activeUserId) {
                user.isActive = true;
            } else {
                user.isActive = false;
            }
        });

        renderApp(appElement, context);
    });
};
export const initClickingFiles = () => {
    const fileElements = document.querySelectorAll(".file");

    fileElements.forEach((element) => {
        element.addEventListener("click", () => {
            context.activeFileName = element.textContent;

            getActiveFile(context);
        });
    });
};
export const updateCode = () => {
    socket.on("sharing/code_update", (data) => {
        console.log(`Выполнен запрос sharing/code_update. Получены данные:`);
        console.log(data);

        context.code = null;

        removeExtraFiles([...context.files, ...data.files], (result) => {
            context.filetree = getFiletree(result);
        });
        context.room.users.map((user) => {
            if (user.id === context.activeUserId) {
                user.isActive = true;
            } else {
                user.isActive = false;
            }
        });
        getActiveFile(context);
    });
};
