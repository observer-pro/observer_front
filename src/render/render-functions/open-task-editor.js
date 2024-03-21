import tasks_editor from "../../templates/tasks_editor.pug";
import { handleSendTasks } from "../../components/tasks/send-tasks.js";
import { handleNotion } from "../../components/tasks/notion.js";

export const openTaskEditor = (context) => {
    const tasksEditorElement = document.getElementById("task-editor");

    if (tasksEditorElement) {
        tasksEditorElement.innerHTML = tasks_editor({ context });

        handleSendTasks();
        handleNotion();
    }
};
