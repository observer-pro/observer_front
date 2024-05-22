import store from "../../store/store.js";
import context from "../../store/context.js";
import { initQuill } from "../../services/quill.js";
import { renderApp } from "../../render/render-app.js";

export const handleInputTaskArea = () => {
    const areaElement = document.getElementById("task-area");
    const editor = initQuill(areaElement);

    editor.container.firstChild.innerHTML = store.tasks[store.active_task];

    if (editor.container.firstChild.innerHTML === "") {
        editor.focus();
    }

    areaElement?.addEventListener("click", () => {
        if (context.isSent) {
            context.isSent = false;

            renderApp(context, ["update-task-editor"]);
        }
    });

    editor.on("text-change", () => {
        store.tasks[store.active_task] = editor.root.innerHTML;
    });
};
