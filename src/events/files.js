import socket from "../components/socket.js";
import { context, appElement } from "../main.js";
import { getFiletree } from "../components/filetree.js";
import { getActiveFile } from "../components/active-files.js";
import { renderApp } from "../render.js";
import { getNewFiles } from "../components/new-files.js";
import { getAllMessages } from "../components/message-form.js";

export const sendCode = () => {
    socket.on("sharing/code_send", (data) => {
        console.log(`Выполнен запрос sharing/code_send. Получены данные:`);
        console.log(data);

        context.activeUserId = +window.localStorage.getItem("ACTIVE_USER_ID");
        context.activeFilePath =
            window.localStorage.getItem("ACTIVE_FILE_PATH");

        if (data?.user_id !== context.activeUserId) {
            console.log("Получены чужие данные");
            return;
        }

        context.files = data.files;
        context.filetree = getFiletree(data.files);

        window.localStorage.setItem(
            "FILES",
            JSON.stringify(getFiletree(data.files)),
        );

        context.allMessages = getAllMessages(
            context.room.users,
            context.room.host,
            context.activeUserId,
        );

        context.room.users.map((user) => {
            if (user.id === context.activeUserId) {
                user.isActive = true;
            } else {
                user.isActive = false;
            }
        });

        renderApp(appElement, context);

        getActiveFile(context);
    });
};
export const initClickingFiles = () => {
    const fileElements = document.querySelectorAll(".file");

    fileElements.forEach((element) => {
        element.addEventListener("click", () => {
            context.activeFilePath = element.dataset.path;

            window.localStorage.setItem(
                "ACTIVE_FILE_PATH",
                element.dataset.path,
            );

            getActiveFile(context);
        });
    });
};
export const updateCode = () => {
    socket.on("sharing/code_update", (data) => {
        console.log(`Выполнен запрос sharing/code_update. Получены данные:`);
        console.log(data);

        context.activeUserId = +window.localStorage.getItem("ACTIVE_USER_ID");
        context.activeFilePath =
            window.localStorage.getItem("ACTIVE_FILE_PATH");

        if (data?.user_id !== context.activeUserId) {
            console.log("Получены чужие данные");
            return;
        }

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
        context.allMessages = getAllMessages(
            context.room.users,
            context.room.host,
            context.activeUserId,
        );

        getActiveFile(context);
    });
};
