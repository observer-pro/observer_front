import store from "../store/store.js";
import context from "../store/context.js";

const getFile = (file) => {
    if (
        store.users[store.active_user_id].latest_updated_paths.includes(
            file.path,
        )
    ) {
        file.isChanged = true;
    }
};

export const getChangedFiles = () => {
    context.filetree?.files.forEach((file) => {
        getFile(file);
    });

    context.filetree?.dirs.forEach((dir) => {
        context.filetree[dir].files.forEach((file) => {
            getFile(file);
        });
    });
};
