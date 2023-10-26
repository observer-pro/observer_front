import socket from "../components/socket.js";
import { context, appElement } from "../main.js";
import { getFiletree } from "../components/filetree.js";
import { getActiveFile } from "../components/active-files.js";
import { renderApp } from "../render.js";
import { getNewFiles } from "../components/new-files.js";

export const sendCode = () => {
    socket.on("sharing/code_send", (data) => {
        console.log(`Выполнен запрос sharing/code_send. Получены данные:`);
        console.log(data);

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
            context.activeFilePath = element.dataset.path;

            getActiveFile(context);
        });
    });
};
export const updateCode = () => {
    socket.on("sharing/code_update", (data) => {
        console.log(`Выполнен запрос sharing/code_update. Получены данные:`);
        console.log(data);

        context.code = null;
        context.files = getNewFiles(context.files, data.files);
        context.filetree = getFiletree(context.files);
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
