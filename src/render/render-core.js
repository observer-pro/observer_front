import { openTaskEditor } from "./render-functions/open-task-editor.js";
import { updateUserPanel } from "./render-functions/update-user-panel.js";
import { updateTaskEditor } from "./render-functions/update-task-editor.js";
import { updateMessageForm } from "./render-functions/update-message-form.js";
import { updateStepsStatus } from "./render-functions/update-steps-status.js";
import { updateCodePanel } from "./render-functions/update-code-panel.js";

const renderCore = {
    "open-task-editor": (context) => {
        openTaskEditor(context);
    },
    "update-user-panel": (context) => {
        updateUserPanel(context);
    },
    "update-task-editor": (context) => {
        updateTaskEditor(context);
    },
    "update-message-form": (context) => {
        updateMessageForm(context);
    },
    "update-steps-status": (context) => {
        updateStepsStatus(context);
    },
    "update-code-panel": (context) => {
        updateCodePanel(context);
    },
};

export default renderCore;
