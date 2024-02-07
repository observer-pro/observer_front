import socket from "../../services/socket.js";
import context from "../../store/context.js";
import { initQuill } from "../../services/quill.js";
import { allTasks } from "./all-tasks.js";
import { render } from "../../render.js";

export const handleSendTasks = () => {
    const areaElement = document.getElementById("task-area");
    const sendTaskElement = document.getElementById("send-task");
    const worksBtnElements = document.querySelectorAll(".task-editor__work");

    let lastActive;

    const editor = initQuill(areaElement);

    areaElement?.addEventListener("click", () => {
        if (context.isSent) {
            context.isSent = false;

            render(context, ["send-tasks"]);
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

            render(context, ["send-tasks"]);
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
                console.log("Отправлен сигнал steps/all. Данные:\n", validData);

                context.isSent = true;

                socket.emit("steps/all", validData);
            }

            render(context, ["send-tasks"]);
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

            console.log("Отправлен сигнал steps/all. Данные:\n", task);
            socket.emit("steps/all", task);

            render(context, ["send-tasks"]);
        }
    });
};
