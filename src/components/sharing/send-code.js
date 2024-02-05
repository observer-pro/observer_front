import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { getFiletree } from "../../utils/get-filetree.js";
import { render } from "../../render.js";
import { getChangedFiles } from "../../utils/get-changed-files.js";
import { getFileByPath } from "../../utils/get-file-by-path.js";
import { markFileAsCurrent } from "../../utils/mark-file-as-current.js";

export const sendCode = () => {
    socket.on("sharing/code_send", (data) => {
        console.log(`Выполнен сигнал sharing/code_send. Данные:`);
        console.log(data);

        const file = getFileByPath(
            store.users[store.active_user_id].current_path,
            data,
        );

        store.files = [...markFileAsCurrent(file, data)];
        store.files = [...getChangedFiles(store)];
        context.filetree = { ...getFiletree(store.files) };

        if (file) {
            context.code = file.content;
        }

        console.log("Файловое дерево:");
        console.log(context.filetree);

        context.currentSteps = [...store.users[store.active_user_id].steps];
        context.allMessages = [...store.users[store.active_user_id].messages];

        render(context, ["share-code-panel", "add-message-form"]);
    });
};
