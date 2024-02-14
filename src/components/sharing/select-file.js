import store from "../../store/store.js";
import context from "../../store/context.js";
import { render } from "../../render.js";
import { getFiletree } from "../../utils/files/get-filetree.js";
import { getFileByPath } from "../../utils/files/get-file-by-path.js";
import { markFileAsCurrent } from "../../utils/files/mark-file-as-current.js";
import { turnOnHighlightJs } from "../../utils/turn-on-hljs.js";

export const handleSelectFile = () => {
    const fileElements = document.querySelectorAll(".file");

    fileElements.forEach((fileTreeElement) => {
        fileTreeElement.addEventListener("click", () => {
            const file = getFileByPath(fileTreeElement.dataset.path, store);

            let pathIndex;

            store.users[store.active_user_id].current_path =
                fileTreeElement.dataset.path;
            store.users[store.active_user_id].latest_updated_paths.forEach(
                (path, index) => {
                    if (
                        path === store.users[store.active_user_id].current_path
                    ) {
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

            render(context, ["update-code-panel"]);
            turnOnHighlightJs();
        });
    });
};
