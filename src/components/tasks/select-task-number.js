import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";
import { getContextTasks } from "../../utils/get-context-tasks.js";

export const selectTaskNumber = (event) => {
    store.active_task = event.target.defaultValue;
    context.tasks = [...getContextTasks(store)];

    renderApp(context, ["update-task-editor"]);
};
