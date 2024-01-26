import store from "../../store/store.js";
import { getActiveFile } from "../../utils/get-active-file.js";

export const handleSelectFile = () => {
    const fileElements = document.querySelectorAll(".file");

    fileElements.forEach((file) => {
        file.addEventListener("click", () => {
            store.users[store.active_user_id].current_path = file.dataset.path;

            getActiveFile();
        });
    });
};
