import { createRoom, endStudent, startStudent } from "./socket-events.js";
import { appElement, context } from "./main.js";
import { renderApp } from "./components/render.js";
import hljs from "./components/hljs.js";

export const initCreatingRoom = () => {
    const createElement = document.querySelector("#create-room");

    createElement.addEventListener("click", () => {
        createRoom(context.hostName);
    });
};
export const initClickingUsers = () => {
    const userElements = document.querySelectorAll(".item");

    userElements.forEach((user) => {
        user.addEventListener("click", () => {
            context.activeUserId = +user.id;

            userElements.forEach((user) => {
                if (context.activeUserId === +user.id) {
                    startStudent(+user.id, context.room.id);
                } else {
                    endStudent(+user.id, context.room.id);
                }
            });
        });
    });
};
export const initClickingFiles = () => {
    const fileElements = document.querySelectorAll(".file");
    const codeElement = document.querySelector("code");

    fileElements.forEach((element) => {
        element.addEventListener("click", () => {
            context.filetree.files.forEach((file) => {
                if (file.name === element.textContent) {
                    console.log("Выбран файл " + file.name);
                    console.log("Содержимое");
                    console.log(file.content);

                    file.isActive = true;
                    context.code = file.content;
                } else {
                    file.isActive = false;
                }
            });
            context.filetree.dirs.forEach((dir) => {
                context.filetree[dir].files.forEach((file) => {
                    if (file.name === element.textContent) {
                        console.log("Выбран файл " + file.name);
                        console.log("Содержимое");
                        console.log(file.content);

                        file.isActive = true;
                        context.code = file.content;
                    } else {
                        file.isActive = false;
                    }
                });
            });

            renderApp(appElement, context);

            hljs.highlightAll(codeElement);
        });
    });
};
