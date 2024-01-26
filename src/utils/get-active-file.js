import store from "../store/store.js";
import context from "../store/context.js";
import hljs from "../services/highlight.js";
import { render } from "../render.js";
import { codeElement } from "../main.js";

let isActiveFile = false;

const selectFile = (file) => {
    if (file.path === store.users[store.active_user_id].current_path) {
        console.log("Выбран файл " + file.name);
        console.log("Содержимое:");
        console.log(file.content);

        isActiveFile = true;
        file.isActive = true;
        context.code = file.content;
    } else {
        file.isActive = false;
    }
};

export const getActiveFile = () => {
    context.filetree?.files.forEach((file) => {
        selectFile(file);
    });

    context.filetree?.dirs.forEach((dir) => {
        context.filetree[dir].files.forEach((file) => {
            selectFile(file);
        });
    });

    if (!isActiveFile) {
        context.code = null;
    }

    render(context, ["share-code-panel"]);

    if (isActiveFile) {
        hljs.highlightAll(codeElement);
    }
};
