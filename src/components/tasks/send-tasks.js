import socket from "../../services/socket.js";
import context from "../../store/context.js";
import { initQuill } from "../../services/quill.js";
import { allTasks } from "./all-tasks.js";
import { renderApp } from "../../render/render-app.js";

export const handleSendTasks = () => {
    const areaElement = document.getElementById("task-area");
    const sendTaskElement = document.getElementById("send-task");
    const worksBtnElements = document.querySelectorAll(".task-editor__work");

    let lastActive;

    const editor = initQuill(areaElement);

    areaElement?.addEventListener("click", () => {
        if (context.isSent) {
            context.isSent = false;

            renderApp(context, ["update-task-editor"]);
        }
    });

    worksBtnElements?.forEach((btn) => {
        if (btn.checked) {
            lastActive = btn.value !== "Теория" ? btn.value : "theory";
        }

        editor.container.firstChild.innerHTML =
            allTasks[lastActive]?.content || "";

        btn?.addEventListener("click", () => {
            if (lastActive === btn.value) {
                return;
            }

            context.taskNumber = btn.value !== "Теория" ? btn.value : "theory";

            localStorage.setItem("TASK_NUMBER", context.taskNumber);

            allTasks[lastActive].visit = false;

            if (!allTasks[lastActive].visit && editor.getContents()) {
                allTasks[lastActive].content =
                    editor.container.firstChild.innerHTML;
                allTasks[lastActive].visit = true;
            }

            renderApp(context, ["update-task-editor"]);
        });
    });

    sendTaskElement?.addEventListener("click", () => {
        const validData = [];

        let flag;

        for (let task in allTasks) {
            allTasks[task].visit === true ? (flag = true) : "";
        }

        if (flag) {
            if (editor.getText()?.length > 0) {
                allTasks[lastActive].content =
                    editor.container.firstChild.innerHTML;
                allTasks[lastActive].visit = true;
            }

            for (let task in allTasks) {
                if (
                    allTasks[task].visit &&
                    allTasks[task]?.content !== "<p><br></p>"
                ) {
                    validData.push({
                        name: `${task === "theory" ? "theory" : task}`,
                        content: `${
                            allTasks[task].content ? allTasks[task].content : ""
                        }`,
                        type: `${task === "theory" ? "theory" : "exercise"}`,
                        language: "html",
                    });
                }
            }

            if (validData?.length > 0) {
                context.isSent = true;

                socket.emit("steps/all", validData);
                console.log("Отправлен сигнал steps/all. Данные:\n", validData);
            }

            renderApp(context, ["update-task-editor"]);
        } else if (editor.getText()?.length > 0) {
            const task = [
                {
                    name: `${lastActive === "theory" ? "theory" : lastActive}`,
                    content: editor.container.firstChild.innerHTML,
                    type: `${lastActive === "theory" ? "theory" : "exercise"}`,
                    language: "html",
                },
            ];

            context.isSent = true;

            socket.emit("steps/all", task);
            console.log("Отправлен сигнал steps/all. Данные:\n", task);

            renderApp(context, ["update-task-editor"]);
        }
    });
};
