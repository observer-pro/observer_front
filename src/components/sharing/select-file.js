import store from "../../store/store.js";
import { getActiveFile } from "../../utils/get-active-file.js";

export const handleSelectFile = () => {
    const fileElements = document.querySelectorAll(".file");

    fileElements.forEach((file) => {
        file.addEventListener("click", () => {
            let pathIndex;

            store.users[store.active_user_id].current_path = file.dataset.path;
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

            getActiveFile();
        });
    });
};
