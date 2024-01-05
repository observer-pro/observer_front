import socket from "../components/socket.js";
import { context, appElement } from "../main.js";
import { getFiletree } from "../components/filetree.js";
import { getActiveFile } from "../components/active-files.js";
import { renderApp } from "../render.js";
import { getNewFiles, getNewFilenames } from "../components/new-files.js";
import { getAllMessages, requireAllMessages } from "./messages.js";
import { user_storeage } from "../components/user-storeage.js";
import { getChangedFile } from "../components/changed-files.js";

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

        context.room.users.map((user) => {
            if (user.id === context.activeUserId) {
                user.isActive = true;
                context.currentSteps = user.steps;

                requireAllMessages(user.id);
            } else {
                user.isActive = false;
            }
        });

        user_storeage[context.activeUserId].current_path =
            context.activeFilePath;

        getAllMessages((messages) => {
            context.allMessages = [...messages];
            user_storeage[context.activeUserId].messages = [...messages];
        });
        getChangedFile(
            context,
            user_storeage[context.activeUserId].latest_updated_paths,
        );
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
            window.localStorage.removeItem("SCROLLED_CODE");

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

        context.room.users.map((user) => {
            if (user.id === context.activeUserId) {
                user.isActive = true;

                requireAllMessages(user.id);
            } else {
                user.isActive = false;
            }
        });

        user_storeage[context.activeUserId].latest_updated_paths.push(
            ...getNewFilenames(data.files),
        );
        context.filetree = getFiletree(getNewFiles(context.files, data.files));

        console.log(user_storeage);

        getChangedFile(
            context,
            user_storeage[context.activeUserId].latest_updated_paths,
        );
        renderApp(appElement, context);

        if (context.code) {
            getActiveFile(context);
        }
    });
};
