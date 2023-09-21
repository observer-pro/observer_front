import { appElement } from "../main.js";
import { renderApp } from "../render.js";
import { codeElement } from "../main.js";
import hljs from "./hljs.js";

export const getActiveFile = (context) => {
    let isActiveFile = false;

    context.filetree.files.forEach((file) => {
        if (file.name === context.activeFileName) {
            console.log("Выбран файл " + file.name);
            console.log("Содержимое:");
            console.log(file.content);

            file.isActive = true;
            context.code = file.content;
            isActiveFile = true;
        } else {
            file.isActive = false;
        }
    });
    context.filetree.dirs.forEach((dir) => {
        context.filetree[dir].files.forEach((file) => {
            if (file.name === context.activeFileName) {
                console.log("Выбран файл " + file.name);
                console.log("Содержимое:");
                console.log(file.content);

                file.isActive = true;
                context.code = file.content;
                isActiveFile = true;
            } else {
                file.isActive = false;
            }
        });
    });

    renderApp(appElement, context);

    if (isActiveFile) {
        hljs.highlightAll(codeElement);
    }
};
