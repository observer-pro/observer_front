import socket from "../../services/socket.js";
import store from "../../store/store.js";
import context from "../../store/context.js";
import { getFiletree } from "../../utils/files/get-filetree.js";
import { renderApp } from "../../render/render-app.js";
import { getChangedFiles } from "../../utils/files/get-changed-files.js";
import { getFileByPath } from "../../utils/files/get-file-by-path.js";
import { markFileAsCurrent } from "../../utils/files/mark-file-as-current.js";
import { startUserSharingSession } from "./select-user.js";
import { endUserSharingSession } from "./select-user.js";

export const sendCode = () => {
    socket.on("sharing/code_send", (data) => {
        console.log(`Выполнен сигнал sharing/code_send. Данные:`);
        console.log(data);

        if (data.user_id !== store.active_user_id) {
            console.error("Получены чужие данные");
            endUserSharingSession({
                user_id: data.user_id,
                room_id: store.room_id,
            });
            startUserSharingSession({
                user_id: store.active_user_id,
                room_id: store.room_id,
            });
            return;
        }

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

        context.currentSteps = { ...store.users[store.active_user_id].steps };
        context.allMessages = [...store.users[store.active_user_id].messages];

        renderApp(context, [
            "update-code-panel",
            "update-message-form",
            "update-steps-status",
        ]);
    });
};
