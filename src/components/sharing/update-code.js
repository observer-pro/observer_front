import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";
import { getNewFiles } from "../../utils/get-new-files.js";
import { getFiletree } from "../../utils/get-filetree.js";
import { getChangedFiles } from "../../utils/get-changed-files.js";
import { sortStoreFiles } from "../../utils/sort-files.js";
import { getFileByPath } from "../../utils/get-file-by-path.js";
import { markFileAsCurrent } from "../../utils/mark-file-as-current.js";

export const updateCode = () => {
    socket.on("sharing/code_update", (data) => {
        console.log("Получен сигнал sharing/code_update. Данные:");
        console.log(data);

        const newFiles = [...getNewFiles(store.files, data.files).files];
        const file = getFileByPath(
            store.users[store.active_user_id].current_path,
            { files: [...newFiles] },
        );

        store.files = [...markFileAsCurrent(file, { files: [...newFiles] })];
        store.files = [...sortStoreFiles(store)];
        store.users[store.active_user_id].latest_updated_paths.push(
            ...getNewFiles(store.files, data.files).names,
        );
        store.users[store.active_user_id].latest_updated_paths = [
            ...new Set(store.users[store.active_user_id].latest_updated_paths),
        ];
        store.files = [...getChangedFiles(store)];
        context.filetree = { ...getFiletree(store.files) };

        if (file) {
            context.code = file.content;
        }

        console.log("Файловое дерево:");
        console.log(context.filetree);

        render(context, ["share-code-panel"]);
    });
};
