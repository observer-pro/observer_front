import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { getFiletree } from "../../utils/get-filetree.js";
import { getActiveFile } from "../../utils/get-active-file.js";
import { render } from "../../render.js";
import { getChangedFiles } from "../../utils/get-changed-files.js";

export const sendCode = () => {
    socket.on("sharing/code_send", (data) => {
        console.log(`Выполнен сигнал sharing/code_send. Данные:`);
        console.log(data);

        store.files = [...data.files];
        context.filetree = { ...getFiletree(store.files) };

        console.log("Файловое дерево:");
        console.log(context.filetree);

        context.currentSteps = [...store.users[store.active_user_id].steps];
        context.code = null;
        context.allMessages = [...store.users[store.active_user_id].messages];

        getChangedFiles();
        render(context, ["share-code-panel", "add-message-form"]);

        if (store.users[store.active_user_id].current_path) {
            getActiveFile();
        }
    });
};
