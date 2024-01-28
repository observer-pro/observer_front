import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";
import { getNewFiles } from "../../utils/get-new-files.js";
import { getFiletree } from "../../utils/get-filetree.js";
import { getActiveFile } from "../../utils/get-active-file.js";
import { getChangedFiles } from "../../utils/get-changed-files.js";
import { sortStoreFiles } from "../../utils/sort-files.js";

let isCurrentPath = false;

export const updateCode = () => {
    socket.on("sharing/code_update", (data) => {
        console.log("Получен сигнал sharing/code_update. Данные:");
        console.log(data);

        store.files = [...getNewFiles(store.files, data.files).files];
        store.users[store.active_user_id].latest_updated_paths.push(
            ...getNewFiles(store.files, data.files).names,
        );
        store.users[store.active_user_id].latest_updated_paths = [
            ...new Set(store.users[store.active_user_id].latest_updated_paths),
        ];
        store.files = [...sortStoreFiles(store)];

        store.files.forEach((file) => {
            if (
                file.filename === store.users[store.active_user_id].current_path
            ) {
                isCurrentPath = true;
            }
        });

        context.filetree = { ...getFiletree(store.files) };

        console.log("Файловое дерево:");
        console.log(context.filetree);

        getChangedFiles();

        if (!isCurrentPath) {
            context.filetree?.files.forEach((file) => {
                file.isActive = false;
            });
            context.code = null;

            render(context, [
                "open-task-editor",
                "add-user-panel",
                "add-message-form",
            ]);
        }

        if (context.code) {
            getActiveFile();
        }

        isCurrentPath = false;
    });
};
