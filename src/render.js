import start from "./templates/start.pug";
import main from "./templates/main.pug";
import user_panel from "./templates/user_panel.pug";
import students from "./templates/students.pug";
import tasks_editor from "./templates/tasks_editor.pug";
import code_panel from "./templates/code_panel.pug";
import messages from "./templates/messages.pug";
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
import { getScrolledChat } from "./utils/get-scrolled-chat.js";
import { handleSendSteps } from "./components/tasks/send-steps.js";

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
        const messagesElement = document.getElementById("messages");

        events.forEach((event) => {
            if (event === "open-task-editor") {
                codePanelElement
                    ? (codePanelElement.innerHTML = code_panel({ context }))
                    : (tasksEditorElement.innerHTML = tasks_editor({
                          context,
                      }));

                handleOpenTaskEditor();
                handleSendTasks();
                handleNotion();
            } else if (event === "add-user-panel") {
                userPanelElement.innerHTML = user_panel({ context });
                document.getElementById("students").innerHTML = students({
                    context,
                });

                handleRehostRoom();
                handleInvite();
                handleCloseRoom();
                handleSelectUser();
                handleOpenTaskEditor();
            } else if (event === "send-tasks") {
                if (tasksEditorElement) {
                    tasksEditorElement.innerHTML = tasks_editor({ context });

                    handleOpenTaskEditor();
                    handleSendTasks();
                    handleNotion();
                }
            } else if (event === "add-message-form") {
                if (messagesElement) {
                    messagesElement.innerHTML = messages({ context });

                    handleToggleForm();
                    handleSendMessage();
                    getScrolledChat();
                    handleSendSteps();
                }
            } else if (event === "share-code-panel") {
                codePanelElement.innerHTML = code_panel({ context });

                handleSelectFile();
            }
        });
    }
};
