import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";
import { getFiletree } from "../../utils/files/get-filetree.js";
import { getFileByPath } from "../../utils/files/get-file-by-path.js";
import { markFileAsCurrent } from "../../utils/files/mark-file-as-current.js";

export const clickFile = (event) => {
    if (
        store.users[store.active_user_id].current_path !==
        event.target.dataset.path
    ) {
        const file = getFileByPath(event.target.dataset.path, store);

        let pathIndex;

        store.users[store.active_user_id].current_path =
            event.target.dataset.path;
        store.users[store.active_user_id].latest_updated_paths.forEach(
            (path, index) => {
                if (path === store.users[store.active_user_id].current_path) {
                    pathIndex = index;
                }
            },
        );
        store.users[store.active_user_id].latest_updated_paths.splice(
            pathIndex,
            1,
        );
        store.files = [...markFileAsCurrent(file, store)];
        context.filetree = { ...getFiletree(store.files) };
        context.code = file.content;

        renderApp(context, ["update-code-panel"]);
    }
};
