import start from "./templates/start.pug";
import main from "./templates/main.pug";
import user_panel from "./templates/user_panel.pug";
import students from "./templates/students.pug";
import tasks_editor from "./templates/tasks_editor.pug";
import code_panel from "./templates/code_panel.pug";
import messages_top from "./templates/messages_top.pug";
import messages_steps from "./templates/messages_steps.pug";
import messages_form from "./templates/messages_form.pug";
import { handleSetNewAddress } from "./components/connection/set-new-address.js";
import { handleCreateRoom } from "./components/room/create-room.js";
import { handleRehostRoom } from "./components/room/rehost-room.js";
import { handleInvite } from "./utils/handle-invite.js";
import { handleCloseRoom } from "./components/room/close-room.js";
import { handleOpenTaskEditor } from "./components/tasks/open-task-editor.js";
import { handleSendTasks } from "./components/tasks/send-tasks.js";
import { handleNotion } from "./components/tasks/notion.js";
import { handleSelectUser } from "./components/sharing/select-user.js";
import { handleSelectFile } from "./components/sharing/select-file.js";
import { handleToggleForm } from "./components/message/toggle-form.js";
import { handleSendMessage } from "./components/message/send-message.js";
import { getScrolledChat } from "./utils/scrolls/get-scrolled-chat.js";
import { handleSendSteps } from "./components/tasks/send-steps.js";
import { turnOnHighlightJs } from "./utils/turn-on-hljs.js";
import {
    setFiletreeScrolledPosition,
    getFiletreeScrolledPosition,
} from "./utils/scrolls/filetree-scrolled-position.js";
import {
    setCodeScrolledPosition,
    getCodeScrolledPosition,
} from "./utils/scrolls/code-scrolled-position.js";

export const render = (context, events = []) => {
    const appElement = document.getElementById("app");

    if (context.isStart) {
        appElement.innerHTML = start({ context });

        handleSetNewAddress();
        handleCreateRoom();
    } else {
        if (events.includes("open-task-editor")) {
            appElement.innerHTML = main({ context });
        }

        const tasksEditorElement = document.getElementById("task-editor");
        const userPanelElement = document.getElementById("user-panel");
        const codePanelElement = document.getElementById("code-panel");
        const messagesTopElement = document.getElementById("messages-top");
        const messagesStepsElement = document.getElementById("messages-steps");
        const messagesFormElement = document.getElementById("messages-form");

        events.forEach((event) => {
            if (event === "open-task-editor") {
                if (tasksEditorElement) {
                    tasksEditorElement.innerHTML = tasks_editor({ context });
                }

                handleOpenTaskEditor();
                handleSendTasks();
                handleNotion();
            } else if (event === "update-user-panel") {
                userPanelElement.innerHTML = user_panel({ context });
                document.getElementById("students").innerHTML = students({
                    context,
                });

                handleRehostRoom();
                handleInvite();
                handleCloseRoom();
                handleSelectUser();
                handleOpenTaskEditor();
            } else if (event === "update-task-editor") {
                if (tasksEditorElement) {
                    tasksEditorElement.innerHTML = tasks_editor({ context });

                    handleOpenTaskEditor();
                    handleSendTasks();
                    handleNotion();
                }
            } else if (event === "update-message-form") {
                if (messagesTopElement) {
                    messagesTopElement.innerHTML = messages_top({ context });

                    handleToggleForm();
                }

                if (messagesFormElement) {
                    messagesFormElement.innerHTML = messages_form({ context });

                    handleSendMessage();
                    getScrolledChat();
                }
            } else if (event === "update-steps-status") {
                if (messagesStepsElement) {
                    messagesStepsElement.innerHTML = messages_steps({
                        context,
                    });

                    handleSendSteps();
                }
            } else if (event === "update-code-panel") {
                if (codePanelElement) {
                    codePanelElement.innerHTML = code_panel({ context });

                    const filetreeElement = document.getElementById("filetree");
                    const codeElement = document.getElementById("code");

                    handleSelectFile();
                    turnOnHighlightJs(codeElement);
                    setFiletreeScrolledPosition(filetreeElement);
                    getFiletreeScrolledPosition(filetreeElement);
                    setCodeScrolledPosition(codeElement);
                    getCodeScrolledPosition(codeElement);
                }
            }
        });
    }
};
