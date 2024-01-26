import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { getFiletree } from "../../utils/get-filetree.js";
import { getActiveFile } from "../../utils/get-active-file.js";
import { render } from "../../render.js";

export const sendCode = () => {
    socket.on("sharing/code_send", (data) => {
        console.log(`Выполнен сигнал sharing/code_send. Данные:`);
        console.log(data);

        store.files = [...data.files];
        context.filetree = { ...getFiletree(store.files) };
        context.currentSteps = [...store.users[store.active_user_id].steps];

        render(context, ["share-code-panel", "add-message-form"]);

        if (context.code) {
            getActiveFile();
        }
    });
};