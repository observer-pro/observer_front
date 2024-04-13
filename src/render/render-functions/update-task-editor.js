import tasks_editor from "../../templates/tasks_editor.pug";
import { handleInputTaskArea } from "../../components/tasks/input-task-area.js";
import { handleNotion } from "../../components/tasks/notion.js";

export const updateTaskEditor = (context) => {
    const tasksEditorElement = document.getElementById("task-editor");

    if (tasksEditorElement) {
        tasksEditorElement.innerHTML = tasks_editor({ context });

        handleInputTaskArea();
        handleNotion();
    }
};
