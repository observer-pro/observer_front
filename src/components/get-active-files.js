import { appElement } from "../main.js";
import { renderApp } from "./render.js";

export const getActiveFile = (fileName, context) => {
    context.filetree.files.forEach((file) => {
        if (file.name === fileName) {
            console.log("Выбран файл " + file.name);
            console.log("Содержимое:");
            console.log(file.content);

            file.isActive = true;
            context.code = file.content;
        } else {
            file.isActive = false;
        }
    });
    context.filetree.dirs.forEach((dir) => {
        context.filetree[dir].files.forEach((file) => {
            if (file.name === fileName) {
                console.log("Выбран файл " + file.name);
                console.log("Содержимое:");
                console.log(file.content);

                file.isActive = true;
                context.code = file.content;
            } else {
                file.isActive = false;
            }
        });
    });

    renderApp(appElement, context);
};

export const checkActiveFiles = (context, set) => {
    let areActiveFiles = false;

    if (context.filetree) {
        context.filetree.files.forEach((file) => {
            if (file.isActive) {
                areActiveFiles = true;
            }
        });
        context.filetree.dirs.forEach((dir) => {
            context.filetree[dir].files.forEach((file) => {
                if (file.isActive) {
                    areActiveFiles = true;
                }
            });
        });
    }

    set(areActiveFiles);
};
