import socket from "../../services/socket.js";
import context from "../../store/context.js";
import { allTasks } from "../../utils/all-tasks.js";
import { render } from "../../render.js";

export const loadSteps = () => {
    socket.on("steps/load", (data) => {
        console.log("Получен сигнал steps/load. Данные:");
        console.log(data);

        const tasksLenght = context.taskCountMode ? 8 : 4;

        data.map((task) => {
            task.visit = true;
        });

        data.forEach((task) => {
            if (task.name === "theory" || +task.name <= tasksLenght) {
                allTasks[task.name] = task;
            }
        });

        context.taskContent = {
            visit: true,
            content: allTasks[context.taskNumber].content,
        };

        render(context, ["send-tasks"]);
    });
};
